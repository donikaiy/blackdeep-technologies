import {screen, waitFor} from '@testing-library/react';
import SelectComponent, {type SelectComponentProps} from '../components/Select/select';
import '@testing-library/jest-dom';
import {useForm} from 'react-hook-form';
import {createListCollection} from '@chakra-ui/react';
import {describe, test, expect} from 'vitest';
import {render} from "./render.tsx";
import {userEvent} from "@testing-library/user-event";

const mockCollections = {
    items: [
        {id: 1, label: 'Option 1', value: 'option1'},
        {id: 2, label: 'Option 2', value: 'option2'},
    ],
};

const collection = createListCollection(mockCollections);

const renderSelectComponent = (
    props: Omit<SelectComponentProps<{ interests: string[] }>, 'control'>,
    defaultValues: { interests: string[] } = {interests: []}
) => {
    const Wrapper = () => {
        const {control} = useForm<{ interests: string[] }>({
            defaultValues,
            mode: 'onChange',
        });
        return <SelectComponent control={control} {...props} />;
    };

    return render(<Wrapper/>);
};

describe('SelectComponent', () => {
    test('renders label and error message', async () => {
        renderSelectComponent({
            name: 'interests',
            collections: collection,
            invalid: true,
            isMultiple: true,
            label: 'Interests',
            errorMessage: 'Please select at least 1 interest',
            placeholder: 'Select interests',
        });

        expect(screen.getByText('Interests')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText('Please select at least 1 interest')).toBeInTheDocument();
        });
    });

    test('renders without error message', () => {
        renderSelectComponent({
            name: 'interests',
            collections: collection,
            invalid: false,
            isMultiple: true,
            label: 'Interests',
            errorMessage: undefined,
            placeholder: 'Select interests',
        });

        expect(screen.getByText('Interests')).toBeInTheDocument();
        expect(screen.queryByText('Please select at least 1 interest')).not.toBeInTheDocument();
    });

    test('renders placeholder when no value is selected', () => {
        renderSelectComponent({
            name: 'interests',
            collections: collection,
            invalid: false,
            isMultiple: true,
            label: 'Interests',
            errorMessage: undefined,
            placeholder: 'Select interests',
        });

        expect(screen.getByText('Select interests')).toBeInTheDocument();
    });

    test("renders options in the dropdown", async () => {
        renderSelectComponent({
            name: "interests",
            collections: collection,
            invalid: false,
            isMultiple: true,
            label: "Interests",
            errorMessage: undefined,
            placeholder: "Select interests",
        });

        const trigger = screen.getByRole("combobox", { name: /interests/i });
        await userEvent.click(trigger);

        await waitFor(() => {
            const options = screen.getAllByRole("option");
            expect(options).toHaveLength(2);
            expect(options[0]).toHaveTextContent("Option 1");
            expect(options[1]).toHaveTextContent("Option 2");
        });
    });

    test('handles single select mode', () => {
        renderSelectComponent({
            name: 'interests',
            collections: collection,
            invalid: false,
            isMultiple: false,
            label: 'Interests',
            errorMessage: undefined,
            placeholder: 'Select an interest',
        });

        expect(screen.getByText('Interests')).toBeInTheDocument();
        expect(screen.getByText('Select an interest')).toBeInTheDocument();
    });
});
