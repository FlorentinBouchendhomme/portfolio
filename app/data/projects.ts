import opportaImg from "~/assets/projects/opporta.png";
import ldaImg from "~/assets/projects/lda.png";
import mobImg from "~/assets/projects/lamobapapa.png";

/**
 * Non-translated project data. Translated texts (title, description, metrics,
 * quote…) live in i18n under `projects.items.<key>`.
 *
 * Code excerpts live here rather than in i18n: vue-i18n message syntax
 * interprets `{ } @ |`, which would break most snippets.
 * Leave `code` to null to hide the block. Several excerpts → one tab per file.
 * Use String.raw so backslashes (PHP namespaces) are kept as is.
 * `pr`: a number ("45" → "PR #45") or a full PR title, shown as is.
 *
 * Example:
 *   code: [
 *     {
 *       file: "src/Controller/ApplyController.php",
 *       pr: "142",
 *       snippet: String.raw`#[Route('/apply/{id}', methods: ['POST'])]`,
 *     },
 *   ],
 */
export type ProjectCode = { file: string; pr: string; snippet: string };

export type ProjectData = {
  key: "opporta" | "lda" | "mob";
  tab: string;
  image: { src: string; width: number; height: number };
  code: ProjectCode[] | null;
};

export const PROJECTS: ProjectData[] = [
  {
    key: "opporta",
    tab: "Opporta",
    image: { src: opportaImg, width: 988, height: 996 },
    code: [
      {
        file: "services.yaml",
        pr: "feat(pipeline): link to 'LBA' #45",
        snippet: String.raw`App\Service\Jobboard\LaBonneAlternanceChannel:
    arguments:
      $baseUrl: "%env(LBA_API_BASE_URL)%"
      $apiToken: "%env(LBA_API_TOKEN)%"
      $enabled: "%env(bool:LBA_API_ENABLED)%"
      $sitePublicUrl: "%env(SITE_PUBLIC_URL)%"
  App\Service\Jobboard\JobboardSyndicationService:
    arguments:
      $channels:
        - '@App\Service\Jobboard\LaBonneAlternanceChannel'
  App\Command\JobboardsSyncCommand:
    arguments:
      $channels:
        - '@App\Service\Jobboard\LaBonneAlternanceChannel'`,
      },
      {
        file: "Jobboard/LaBonneAlternanceChannel.php",
        pr: "feat(pipeline): link to 'LBA' #45",
        snippet: String.raw`final class LaBonneAlternanceChannel implements JobboardChannelInterface
{
    private const OFFER_ENDPOINT = '/job/v1/offer';

    private const CONTRACT_TYPE_MAP = [
        "Contrat d'apprentissage" => ['Apprentissage'],
        'Contrat de professionnalisation' => ['Professionnalisation'],
    ];

    public function __construct(
        private readonly HttpClientInterface $httpClient,
        private readonly string $baseUrl,
        private readonly string $apiToken,
        private readonly bool $enabled,
        private readonly string $sitePublicUrl,
    ) {}

    public function getName(): string
    {
        return 'la_bonne_alternance';
    }

    public function isEnabled(): bool
    {
        return $this->enabled && $this->apiToken !== '';
    }

    public function push(Offer $offer, OfferJobboardSync $sync): void
    {
        $payload = $this->buildPayload($offer);
        $hash = hash('sha256', json_encode($payload, JSON_THROW_ON_ERROR));

        if ($sync->getExternalId() && $sync->getPayloadHash() === $hash) {
            return; // nothing changed since the last successful push
        }

        try {
            if ($sync->getExternalId()) {
                $this->httpClient->request('PUT', $this->baseUrl . self::OFFER_ENDPOINT . '/' . $sync->getExternalId(), [
                    'auth_bearer' => $this->apiToken,
                    'json' => $payload,
                    'timeout' => 10,
                ]);
            } else {
                $response = $this->httpClient->request('POST', $this->baseUrl . self::OFFER_ENDPOINT, [
                    'auth_bearer' => $this->apiToken,
                    'json' => $payload,
                    'timeout' => 10,
                ]);
                $data = $response->toArray();
                if (empty($data['id'])) {
                    throw new JobboardSyncException('Réponse inattendue de La Bonne Alternance (id manquant)');
                }
                $sync->setExternalId((string) $data['id']);
            }
        } catch (JobboardSyncException $e) {
            throw $e;
        } catch (\Throwable $e) {
            throw new JobboardSyncException('La Bonne Alternance: ' . $e->getMessage(), previous: $e);
        }

        $sync->setPayloadHash($hash);
    }

    public function withdraw(Offer $offer, OfferJobboardSync $sync): void
    {
        if (!$sync->getExternalId()) {
            return; // never successfully pushed, nothing to withdraw
        }

        $payload = $this->buildPayload($offer);
        $payload['offer']['status'] = 'Cancelled';

        try {
            $this->httpClient->request('PUT', $this->baseUrl . self::OFFER_ENDPOINT . '/' . $sync->getExternalId(), [
                'auth_bearer' => $this->apiToken,
                'json' => $payload,
                'timeout' => 10,
            ]);
        } catch (\Throwable $e) {
            throw new JobboardSyncException('La Bonne Alternance (retrait): ' . $e->getMessage(), previous: $e);
        }
    }

    /**
     * @throws JobboardSyncException if required data (SIRET, a usable description) is missing
     */
    private function buildPayload(Offer $offer): array
    {
        $siret = $offer->getGeiq()?->getSiret();
        if (!$siret) {
            throw new JobboardSyncException('SIRET du GEIQ manquant - renseignez-le via "Mon GEIQ"');
        }

        $description = trim(strip_tags($offer->getInformation() ?? ''));
        if (mb_strlen($description) < 30) {
            throw new JobboardSyncException("Description de l'offre trop courte pour La Bonne Alternance (30 caractères minimum)");
        }

        $city = $offer->getCity();
        $companyName = $offer->getCompanyEmployee()?->getCompany()?->getName();
        $contractType = self::CONTRACT_TYPE_MAP[$offer->getContract()?->getName()] ?? ['Apprentissage', 'Professionnalisation'];

        return [
            'identifier' => [
                'partner_job_id' => (string) $offer->getId(),
            ],
            'workplace' => array_filter([
                'siret' => $siret,
                'name' => $companyName,
                // Only postal-code/city precision (no street address on Offer/City) - coarser
                // than the API's recommendation, but still enough for radius-based search.
                'location' => $city ? [
                    'address' => trim(($city->getPostCode() ?? '') . ' ' . $city->getName()),
                ] : null,
            ], fn($value) => $value !== null),
            'apply' => [
                'url' => rtrim($this->sitePublicUrl, '/') . '/offres/' . $offer->getSlug(),
            ],
            'contract' => array_filter([
                'start' => $offer->getContractStartAt()?->format('c'),
                'type' => $contractType,
            ], fn($value) => $value !== null),
            'offer' => [
                'title' => $offer->getJob()?->getName() ?? 'Poste à pourvoir',
                'description' => $description,
                'opening_count' => 1,
                'status' => 'Active',
            ],
        ];
    }
}`,
      },
    ],
  },
  {
    key: "lda",
    tab: "LDA / LDI",
    image: { src: ldaImg, width: 1902, height: 980 },
    code: null,
  },
  {
    key: "mob",
    tab: "La Mob à Papa",
    image: { src: mobImg, width: 1222, height: 808 },
    code: null,
  },
];
