import {Field, Input} from "@chakra-ui/react"
import type {UseFormRegisterReturn} from "react-hook-form";

interface InputComponentProps {
    label: string,
    invalid: boolean,
    register: UseFormRegisterReturn,
    errorMessage?: string
}

const InputComponent = ({label, invalid, register, errorMessage}: InputComponentProps) => {
    return (
        <Field.Root invalid={invalid}>
            <Field.Label>{label}</Field.Label>
            <Input {...register}/>
            {errorMessage && <Field.ErrorText>{errorMessage}</Field.ErrorText>}
        </Field.Root>
    )
}

export default InputComponent
