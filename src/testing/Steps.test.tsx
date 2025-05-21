import { screen, waitFor } from "@testing-library/react";
import StepsComponent from "../components/Steps/steps.tsx";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import {render} from "./render.tsx";
import {describe, test, expect, vi} from 'vitest';

describe("StepsComponent", () => {
    const steps = [
        { id: 1, title: "Step One", content: <div>Step 1 Content</div> },
        { id: 2, title: "Step Two", content: <div>Step 2 Content</div> },
        { id: 3, title: "Step Three", content: <div>Step 3 Content</div> },
    ];

    test("shows Complete button on last step", async () => {
        render(<StepsComponent steps={steps} activeStep={2} onStepChange={vi.fn()} />);

        await waitFor(() => {
            expect(screen.getByText("Complete")).toBeInTheDocument();
        });

        expect(screen.getByText("Previous")).toBeInTheDocument();
        expect(screen.queryByText("Continue")).not.toBeInTheDocument();
    });

    test("navigates to next step when Continue is clicked", async () => {
        const onStepChange = vi.fn();
        render(<StepsComponent steps={steps} activeStep={0} onStepChange={onStepChange} />);

        const continueButton = screen.getByRole("button", { name: /continue/i });
        await userEvent.click(continueButton);

        await waitFor(() => {
            expect(onStepChange).toHaveBeenCalledWith(1);
        });
    });

    test("navigates to previous step when Previous is clicked", async () => {
        const onStepChange = vi.fn();
        render(<StepsComponent steps={steps} activeStep={1} onStepChange={onStepChange} />);

        const previousButton = screen.getByRole("button", { name: /previous/i });
        await userEvent.click(previousButton);

        await waitFor(() => {
            expect(onStepChange).toHaveBeenCalledWith(0);
        });
    });
});
