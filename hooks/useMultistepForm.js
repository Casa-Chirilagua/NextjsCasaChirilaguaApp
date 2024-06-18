import { current } from "@reduxjs/toolkit";
import { useState } from "react";

export function useMultistepForm(steps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }

  function previous() {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }

  return {
    currentStepIndex,
    currentStep: steps[currentStepIndex],
    steps,
    goToStep: (index) => setCurrentStepIndex(index),
    next,
    previous,
    isLastStep: currentStepIndex === steps.length - 1,
    isFirstStep: currentStepIndex === 0,
    getStep: () => steps[currentStepIndex],
  };
}
