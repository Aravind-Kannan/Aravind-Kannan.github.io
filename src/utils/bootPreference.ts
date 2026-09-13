const STORAGE_KEY = "aravind.bootSequence";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Persisted browser preference — off by default. */
export function getBootPreference(): "off" | "always" {
  try {
    return localStorage.getItem(STORAGE_KEY) === "always" ? "always" : "off";
  } catch {
    return "off";
  }
}

export function setBootPreference(mode: "off" | "always"): void {
  try {
    if (mode === "always") {
      localStorage.setItem(STORAGE_KEY, "always");
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    /* private mode */
  }
}

/**
 * Read and strip `?boot` from the URL.
 * - `?boot` / `?boot=1` / `?boot=once` → play once
 * - `?boot=always` / `?boot=on` → persist + play
 * - `?boot=off` / `?boot=0` → clear preference, skip
 */
export function consumeQueryBootFlag(): "once" | "always" | "off" | null {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  if (!params.has("boot")) return null;

  const raw = (params.get("boot") ?? "").toLowerCase();
  params.delete("boot");
  const qs = params.toString();
  const next = `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`;
  window.history.replaceState({}, "", next);

  if (raw === "off" || raw === "0" || raw === "false") return "off";
  if (raw === "always" || raw === "on") return "always";
  return "once"; // bare ?boot, =1, =once, etc.
}

/** Call once at app boot. Reduced-motion always wins. */
export function shouldPlayBootOnLoad(): boolean {
  if (typeof window === "undefined") return false;
  if (prefersReducedMotion()) return false;

  const fromQuery = consumeQueryBootFlag();
  if (fromQuery === "off") {
    setBootPreference("off");
    return false;
  }
  if (fromQuery === "always") {
    setBootPreference("always");
    return true;
  }
  if (fromQuery === "once") return true;

  return getBootPreference() === "always";
}
