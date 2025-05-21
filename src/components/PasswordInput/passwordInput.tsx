import {Field} from "@chakra-ui/react"
import {PasswordInput} from "../ui/password-input.tsx";
import type {UseFormRegisterReturn} from "react-hook-form";

interface PasswordInputProps {
    label: string,
    invalid: boolean,
    register: UseFormRegisterReturn,
    errorMessage?: string
}

const PasswordInputComponent = ({label, invalid, register, errorMessage}: PasswordInputProps) => {
    return (
        <Field.Root invalid={invalid}>
            <Field.Label>{label}</Field.Label>
            <PasswordInput {...register} />
            {errorMessage && <Field.ErrorText>{errorMessage}</Field.ErrorText>}
        </Field.Root>
    )
}

export default PasswordInputComponent
