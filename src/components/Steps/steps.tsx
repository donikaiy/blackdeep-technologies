import {Button, ButtonGroup, Steps} from "@chakra-ui/react";
import * as React from "react";

interface StepType {
    id: number;
    title: string;
    content: React.ReactNode;
}

interface StepChangeDetails {
    step: number;
}

interface StepsComponentProps {
    orientation?: "horizontal" | "vertical";
    steps: StepType[];
    disabled?: boolean;
    activeStep: number;
    onStepChange: (newStep: number) => void;
}

const StepsComponent = ({
                            orientation = "horizontal",
                            steps,
                            disabled,
                            activeStep,
                            onStepChange
                        }: StepsComponentProps) => {
    const isFirstStep = activeStep === 0;
    const isLastStep = activeStep === steps.length - 1;

    const handleActualStepChange = (details: StepChangeDetails) => {
        onStepChange(details.step);
    };

    return (
        <Steps.Root orientation={orientation} step={activeStep}
                    onStepChange={handleActualStepChange} count={steps.length} width="100%">
            <Steps.List>
                {steps.map((step, index) => (
                    <Steps.Item key={index} index={index} title={step.title}>
                        <Steps.Trigger disabled={disabled}>
                            <Steps.Indicator/>
                            <Steps.Title>{step.title}</Steps.Title>
                        </Steps.Trigger>
                        <Steps.Separator/>
                    </Steps.Item>
                ))}
            </Steps.List>

            {steps.map((step, index) => (
                <Steps.Content key={index} index={index}>
                    {step.content}
                </Steps.Content>
            ))}

            <ButtonGroup variant="outline" display="flex" gap="16px">
                {!isFirstStep && <Steps.PrevTrigger asChild>
                    <Button flex={1}>Previous</Button>
                </Steps.PrevTrigger>}

                {isLastStep ? (
                    <Button type="submit" disabled={disabled} flex={1} variant="solid">
                        Complete
                    </Button>
                ) : (
                    <Steps.NextTrigger asChild>
                        <Button disabled={disabled} flex={1} variant="solid">
                            Continue
                        </Button>
                    </Steps.NextTrigger>
                )}
            </ButtonGroup>
        </Steps.Root>
    );
};

export default StepsComponent;
