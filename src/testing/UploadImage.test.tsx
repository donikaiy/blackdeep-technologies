import {  screen } from "@testing-library/react";
import UploadImage from "../components/UploadImage/uploadImage";
import "@testing-library/jest-dom";
import {render} from "./render.tsx";
import {describe, test, expect, vi} from 'vitest';

describe("UploadImage", () => {
    test("renders upload button and file input", () => {
        render(<UploadImage onFileSelect={vi.fn()} />);

        expect(screen.getByText(/upload file/i)).toBeInTheDocument();
        expect(screen.getByTestId("file-input")).toBeInTheDocument();
    });

    test("renders with correct accessibility attributes", () => {
        render(<UploadImage onFileSelect={vi.fn()} />);

        const button = screen.getByRole("button", { name: /upload file/i });
        expect(button).toBeInTheDocument();

        const input = screen.getByTestId("file-input");
        expect(input).toHaveAttribute("accept", "image/*");
        expect(input).toHaveAttribute("type", "file");
    });
});
