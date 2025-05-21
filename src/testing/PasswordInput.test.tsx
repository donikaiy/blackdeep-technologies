import {screen} from '@testing-library/react';
import {describe, test, expect, vi} from 'vitest';
import PasswordInputComponent from '../components/PasswordInput/passwordInput';
import '@testing-library/jest-dom';
import {render} from "./render.tsx";
import {userEvent} from "@testing-library/user-event";

describe('PasswordInputComponent', () => {
    test('renders label and error message', () => {
        render(<PasswordInputComponent
            label="Password"
            invalid={true}
            register={{name: 'password', onChange: vi.fn(), onBlur: vi.fn(), ref: vi.fn()}}
            errorMessage="Password error"
        />)

        expect(screen.getByText('Password')).toBeInTheDocument();
        expect(screen.getByText('Password error')).toBeInTheDocument();
    });

    test('does not render error message when invalid is false', () => {
        render(
            <PasswordInputComponent
                label="Password"
                invalid={false}
                register={{name: 'password', onChange: vi.fn(), onBlur: vi.fn(), ref: vi.fn()}}
                errorMessage="Password error"
            />
        );

        expect(screen.getByText('Password')).toBeInTheDocument();
        expect(screen.queryByText('Password error')).not.toBeInTheDocument();
    });

    test('calls onChange when typing', async () => {
        const onChange = vi.fn();
        render(
            <PasswordInputComponent
                label="Password"
                invalid={false}
                register={{name: 'password', onChange, onBlur: vi.fn(), ref: vi.fn()}}
                errorMessage="Password error"
            />
        );

        const input = screen.getByLabelText('Password');
        await userEvent.type(input, 'Qwe123@@');
        expect(onChange).toHaveBeenCalled();
    });

    test('calls onBlur when input loses focus', async () => {
        const onBlur = vi.fn();
        render(
            <PasswordInputComponent
                label="Password"
                invalid={false}
                register={{name: 'password', onChange: vi.fn(), onBlur, ref: vi.fn()}}
                errorMessage="Password error"
            />
        );

        const input = screen.getByLabelText('Password');
        await userEvent.click(input); // Focus
        await userEvent.tab(); // Blur
        expect(onBlur).toHaveBeenCalled();
    });

    test('updates input value when typing', async () => {
        render(
            <PasswordInputComponent
                label="Password"
                invalid={false}
                register={{name: 'password', onChange: vi.fn(), onBlur: vi.fn(), ref: vi.fn()}}
                errorMessage="Password error"
            />
        );

        const input = screen.getByLabelText('Password');
        await userEvent.type(input, 'Qwe123@@');
        expect(input).toHaveValue('Qwe123@@');
    });

    test('does not render error message when errorMessage is undefined', () => {
        render(
            <PasswordInputComponent
                label="Password"
                invalid={true}
                register={{name: 'password', onChange: vi.fn(), onBlur: vi.fn(), ref: vi.fn()}}
            />
        );

        expect(screen.getByText('Password')).toBeInTheDocument();
        expect(screen.queryByText('Password error')).not.toBeInTheDocument();
    });
});
