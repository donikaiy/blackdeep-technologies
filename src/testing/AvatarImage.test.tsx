import {act, screen, waitFor} from '@testing-library/react';
import AvatarImage from '../components/AvatarImage/avatarImage';
import '@testing-library/jest-dom';
import {describe, test, expect, vi} from 'vitest';
import '@testing-library/jest-dom';
import {render} from "./render.tsx";

describe('AvatarImage', () => {
  test('renders avatar fallback and image', async () => {
    await act(async () => {
      render(<AvatarImage name="John Doe" src="avatar.png" />);
    });

    await waitFor(() => {
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    const img = screen.getByRole('img', { hidden: true });
    expect(img).toHaveAttribute('src', 'avatar.png');
  });

  test("renders correct initials for different names", async () => {
    await act(async () => {
      render(<AvatarImage name="Alice Smith" src="avatar.png" />);
    });

    await waitFor(() => {
      expect(screen.getByText("AS")).toBeInTheDocument();
    });
  });

  test("renders correct initials for different names", async () => {
    await act(async () => {
      render(<AvatarImage name="Alice Smith" src="avatar.png" />);
    });

    await waitFor(() => {
      expect(screen.getByText("AS")).toBeInTheDocument();
    });
  });

  test("handles empty name gracefully", async () => {
    await act(async () => {
      render(<AvatarImage name="" src="avatar.png" />);
    });

    await waitFor(() => {
      expect(screen.queryByText(/\w+/)).not.toBeInTheDocument(); // No initials
    });

    const img = screen.getByRole("img", { hidden: true });
    expect(img).toHaveAttribute("src", "avatar.png");
  });

  test("handles image load failure by showing fallback", async () => {
    const imgErrorSpy = vi
        .spyOn(HTMLImageElement.prototype, "onerror", "set")
        .mockImplementation((handler: any) => {
          handler(); // Trigger error immediately
        });

    await act(async () => {
      render(<AvatarImage name="John Doe" src="invalid.png" />);
    });

    await waitFor(() => {
      expect(screen.getByText("JD")).toBeInTheDocument();
    });

    const img = screen.getByRole("img", { hidden: true });
    expect(img).toHaveAttribute("src", "invalid.png");

    imgErrorSpy.mockRestore();
  });
});
