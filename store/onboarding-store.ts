import {
  ONBOARDING_INITIAL_SETTINGS_KEY,
  readOnboardingData,
  saveOnboardingData,
} from "@/lib/onboarding-store";

export const ONBOARDING_KEYS = {
  barberShop: "barberpro:onboarding:dados-barbearia",
  plan: "barberpro:onboarding:plano",
  account: "barberpro:onboarding:conta",
  settings: ONBOARDING_INITIAL_SETTINGS_KEY,
};

export type OnboardingSnapshot = {
  barberShop?: Record<string, unknown>;
  plan?: Record<string, unknown>;
  account?: Record<string, unknown>;
  settings?: Record<string, unknown>;
};

export function getOnboardingSnapshot(): OnboardingSnapshot {
  return {
    barberShop: readOnboardingData<Record<string, unknown> | undefined>(ONBOARDING_KEYS.barberShop, undefined),
    plan: readOnboardingData<Record<string, unknown> | undefined>(ONBOARDING_KEYS.plan, undefined),
    account: readOnboardingData<Record<string, unknown> | undefined>(ONBOARDING_KEYS.account, undefined),
    settings: readOnboardingData<Record<string, unknown> | undefined>(ONBOARDING_KEYS.settings, undefined),
  };
}

export function saveOnboardingStep<T>(key: string, value: T) {
  saveOnboardingData(key, value);
}

export function getFirstPendingOnboardingRoute(snapshot = getOnboardingSnapshot()) {
  if (!snapshot.settings) {
    return "/cadastro/configuracoes-iniciais";
  }

  return null;
}

export function clearOnboardingState() {
  if (typeof window === "undefined") {
    return;
  }

  Object.values(ONBOARDING_KEYS).forEach((key) => window.localStorage.removeItem(key));
}
