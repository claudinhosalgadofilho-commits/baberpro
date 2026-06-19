export const ONBOARDING_INITIAL_SETTINGS_KEY = "barberpro:onboarding:configuracoes-iniciais";

export function readOnboardingData<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const stored = window.localStorage.getItem(key);
    return stored ? ({ ...fallback, ...JSON.parse(stored) } as T) : fallback;
  } catch {
    return fallback;
  }
}

export function saveOnboardingData<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}
