export function useI18nText() {
  const { rt } = useI18n();

  /**
   * Convert i18n "message nodes" (returned by tm()) to plain strings.
   * Works with:
   * - string
   * - vue-i18n message nodes (objects containing loc/body)
   * - any unknown value (falls back to String)
   */
  function toText(v: any): string {
    try {
      // rt() converts message nodes to string, and passes through strings
      return typeof v === "string" ? v : rt(v);
    } catch {
      // fallback for older/edge node shapes
      return v?.body?.static ?? v?.loc?.source ?? String(v ?? "");
    }
  }

  function toTextArray(arr: any[] | undefined | null): string[] {
    if (!arr) return [];
    return arr.map(toText);
  }

  return { toText, toTextArray };
}
