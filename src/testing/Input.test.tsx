import {screen} from '@testing-library/react';
import {describe, test, expect, vi} from 'vitest';
import InputComponent from '../components/Input/input';
import '@testing-library/jest-dom';
import {render} from "./render.tsx";
import {userEvent} from "@testing-library/user-event";

describe('InputComponent', () => {
    test('renders label and error message', () => {
        render(<InputComponent
            label="First Name"
            invalid={true}
            register={{name: 'firstName', onChange: vi.fn(), onBlur: vi.fn(), ref: vi.fn()}}
            errorMessage="First name error"
        />)

        expect(screen.getByText('First Name')).toBeInTheDocument();
        expect(screen.getByText('First name error')).toBeInTheDocument();
    });

    test('does not render error message when invalid is false', () => {
        render(
            <InputComponent
                label="First Name"
                invalid={false}
                register={{ name: 'firstName', onChange: vi.fn(), onBlur: vi.fn(), ref: vi.fn() }}
                errorMessage="First name error"
            />
        );

        expect(screen.getByText('First Name')).toBeInTheDocument();
        expect(screen.queryByText('First name error')).not.toBeInTheDocument();
    });

    test('calls onChange when typing', async () => {
        const onChange = vi.fn();
        render(
            <InputComponent
                label="First Name"
                invalid={false}
                register={{ name: 'firstName', onChange, onBlur: vi.fn(), ref: vi.fn() }}
                errorMessage="First name error"
            />
        );

        const input = screen.getByLabelText('First Name');
        await userEvent.type(input, 'John');
        expect(onChange).toHaveBeenCalled();
    });

    test('calls onBlur when input loses focus', async () => {
        const onBlur = vi.fn();
        render(
            <InputComponent
                label="First Name"
                invalid={false}
                register={{ name: 'firstName', onChange: vi.fn(), onBlur, ref: vi.fn() }}
                errorMessage="First name error"
            />
        );

        const input = screen.getByLabelText('First Name');
        await userEvent.click(input); // Focus
        await userEvent.tab(); // Blur
        expect(onBlur).toHaveBeenCalled();
    });

    test('updates input value when typing', async () => {
        render(
            <InputComponent
                label="First Name"
                invalid={false}
                register={{ name: 'firstName', onChange: vi.fn(), onBlur: vi.fn(), ref: vi.fn() }}
                errorMessage="First name error"
            />
        );

        const input = screen.getByLabelText('First Name');
        await userEvent.type(input, 'John');
        expect(input).toHaveValue('John');
    });

    test('does not render error message when errorMessage is undefined', () => {
        render(
            <InputComponent
                label="First Name"
                invalid={true}
                register={{ name: 'firstName', onChange: vi.fn(), onBlur: vi.fn(), ref: vi.fn() }}
            />
        );

        expect(screen.getByText('First Name')).toBeInTheDocument();
        expect(screen.queryByText('First name error')).not.toBeInTheDocument();
    });
});
