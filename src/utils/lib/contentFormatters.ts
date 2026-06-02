export interface InstructionStep {
  number: number;
  text: string;
  subItems: string[];
}

export function parseInstructions(text: string): InstructionStep[] {
  if (!text) return [];

  const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
  const steps: InstructionStep[] = [];
  let currentStep: InstructionStep | null = null;

  for (const line of lines) {
    const stepMatch = line.match(/^(\d+)\.\s+(.+)$/);

    if (stepMatch) {
      // This is a numbered step
      if (currentStep) {
        steps.push(currentStep);
      }
      currentStep = {
        number: parseInt(stepMatch[1]),
        text: stepMatch[2],
        subItems: []
      };
    } else if (currentStep && line) {
      // This is a sub-item under the current step
      currentStep.subItems.push(line);
    }
  }

  if (currentStep) {
    steps.push(currentStep);
  }

  return steps;
}

export function parseConceptParagraphs(text: string): string[] {
  if (!text) return [];

  return text.split('\n\n').filter(para => para.trim().length > 0);
}
