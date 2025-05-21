import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {render} from "./render.tsx";
import {describe, test, expect} from 'vitest';
import RegistrationForm from "../components/RegistrationForm/registrationForm.tsx";

describe('RegistrationForm validation', () => {
  test('firstName field - too short', async () => {
    render(<RegistrationForm/>)

    const input = screen.getByLabelText(/first name/i);
    await userEvent.clear(input);
    await userEvent.type(input, 'a');
    expect(await screen.findByText(/first name must be at least 2 characters/i)).toBeInTheDocument();
  });

  test('firstName field - too long', async () => {
    render(<RegistrationForm/>)

    const input = screen.getByLabelText(/first name/i);
    await userEvent.clear(input);
    await userEvent.type(input, 'a'.repeat(51));
    expect(await screen.findByText(/first name cannot exceed 50 characters/i)).toBeInTheDocument();
  });

  test('firstName field - invalid characters', async () => {
    render(<RegistrationForm/>)

    const input = screen.getByLabelText(/first name/i);
    await userEvent.clear(input);
    await userEvent.type(input, 'John123');
    expect(await screen.findByText(/first name can only contain letters, spaces, hyphens, or apostrophes/i)).toBeInTheDocument();
  });

  test('lastName field - too short', async () => {
    render(<RegistrationForm/>)

    const input = screen.getByLabelText(/last name/i);
    await userEvent.clear(input);
    await userEvent.type(input, 'a');
    expect(await screen.findByText(/last name must be at least 2 characters/i)).toBeInTheDocument();
  });

  test('lastName field - too long', async () => {
    render(<RegistrationForm/>)

    const input = screen.getByLabelText(/last name/i);
    await userEvent.clear(input);
    await userEvent.type(input, 'b'.repeat(51));
    expect(await screen.findByText(/last name cannot exceed 50 characters/i)).toBeInTheDocument();
  });

  test('lastName field - invalid characters', async () => {
    render(<RegistrationForm/>)

    const input = screen.getByLabelText(/last name/i);
    await userEvent.clear(input);
    await userEvent.type(input, 'Doe123!');
    expect(await screen.findByText(/last name can only contain letters, spaces, hyphens, or apostrophes/i)).toBeInTheDocument();
  });

  test('password - too long', async () => {
    render(<RegistrationForm/>)

    const input = screen.getByLabelText(/^password$/i);
    const longPassword = 'A1a!' + 'a'.repeat(97);
    await userEvent.clear(input);
    await userEvent.type(input, longPassword + 'a');
    expect(await screen.findByText(/password cannot exceed 100 characters/i)).toBeInTheDocument();
  });

  test('password - missing uppercase letter', async () => {
    render(<RegistrationForm/>)

    const input = screen.getByLabelText(/^password$/i);
    await userEvent.clear(input);
    await userEvent.type(input, 'abcdefg1!');
    expect(await screen.findByText(/password must contain at least one uppercase letter/i)).toBeInTheDocument();
  });

  test('password - missing lowercase letter', async () => {
    render(<RegistrationForm/>)

    const input = screen.getByLabelText(/^password$/i);
    await userEvent.clear(input);
    await userEvent.type(input, 'ABCDEFG1!');
    expect(await screen.findByText(/password must contain at least one lowercase letter/i)).toBeInTheDocument();
  });

  test('password - missing number', async () => {
    render(<RegistrationForm/>)

    const input = screen.getByLabelText(/^password$/i);
    await userEvent.clear(input);
    await userEvent.type(input, 'Abcdefgh!');
    expect(await screen.findByText(/password must contain at least one number/i)).toBeInTheDocument();
  });

  test('password - missing special character', async () => {
    render(<RegistrationForm/>)

    const input = screen.getByLabelText(/^password$/i);
    await userEvent.clear(input);
    await userEvent.type(input, 'Abcdefg1');
    expect(await screen.findByText(/password must contain at least one special character/i)).toBeInTheDocument();
  });

  test('confirmPassword - too short', async () => {
    render(<RegistrationForm/>)

    const input = screen.getByLabelText(/confirm password/i);
    await userEvent.clear(input);
    await userEvent.type(input, '123');
    expect(await screen.findByText(/confirm password must be at least 8 characters/i)).toBeInTheDocument();
  });

  test('confirmPassword - too long', async () => {
    render(<RegistrationForm/>)

    const input = screen.getByLabelText(/confirm password/i);
    await userEvent.clear(input);
    await userEvent.type(input, 'a'.repeat(101));
    expect(await screen.findByText(/confirm password cannot exceed 100 characters/i)).toBeInTheDocument();
  });

  test('confirmPassword - passwords do not match', async () => {
    render(<RegistrationForm/>)

    const password = screen.getByLabelText(/^password$/i);
    const confirm = screen.getByLabelText(/confirm password/i);
    await userEvent.clear(password);
    await userEvent.type(password, 'Abcd1234!');
    await userEvent.clear(confirm);
    await userEvent.type(confirm, 'Different1!');
    expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument();
  });
});
