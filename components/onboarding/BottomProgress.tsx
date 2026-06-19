import { StepIndicator } from "@/components/onboarding/StepIndicator";

export function BottomProgress({ currentStep = 3 }: { currentStep?: number }) {
  return <StepIndicator compact currentStep={currentStep} />;
}
