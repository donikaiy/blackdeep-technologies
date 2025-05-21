import {Field, Portal, Select, type ListCollection} from "@chakra-ui/react"
import {type Control, Controller, type FieldValues, type Path} from "react-hook-form";
import {useColorMode} from "../ui/color-mode.tsx";

interface SelectItem {
    id: number,
    label: string,
    value: string
}

export interface SelectComponentProps<T extends FieldValues> {
    name: Path<T>,
    control: Control<T>,
    collections: ListCollection<SelectItem>,
    invalid: boolean,
    isMultiple: boolean,
    label: string,
    errorMessage: string | undefined,
    placeholder: string,
}

const SelectComponent = <T extends FieldValues>({
                                                    collections,
                                                    control,
                                                    invalid,
                                                    isMultiple = false,
                                                    label,
                                                    errorMessage,
                                                    placeholder,
                                                    name
                                                }: SelectComponentProps<T>) => {
    const {colorMode} = useColorMode()

    return (
        <Field.Root invalid={invalid}>
            <Field.Label>{label}</Field.Label>
            <Controller name={name} control={control} render={({field}) => (
                <Select.Root name={field.name} value={field.value} onValueChange={({value}) => field.onChange(value)}
                             onInteractOutside={() => field.onBlur()} multiple={isMultiple} collection={collections}>
                    <Select.HiddenSelect/>
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText placeholder={placeholder}/>
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.Indicator/>
                        </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                        <Select.Positioner>
                            <Select.Content>
                                {collections.items.map((collection: SelectItem) => (
                                    <Select.Item
                                        color={colorMode === 'light' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)'}
                                        item={collection}
                                        key={collection.value}>
                                        {collection.label}
                                        <Select.ItemIndicator/>
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Portal>
                </Select.Root>
            )}
            />

            {errorMessage && <Field.ErrorText>{errorMessage}</Field.ErrorText>}
        </Field.Root>
    )
}

export default SelectComponent
