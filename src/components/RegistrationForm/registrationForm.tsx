import {useForm} from "react-hook-form";
import InputComponent from "../Input/input.tsx";
import PasswordInputComponent from "../PasswordInput/passwordInput.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import SelectComponent from "../Select/select.tsx";
import StepsComponent from "../Steps/steps.tsx";
import {Flex} from "@chakra-ui/react";
import UploadImage from "../UploadImage/uploadImage.tsx";
import AvatarImage from "../AvatarImage/avatarImage.tsx";
import * as React from "react";
import {useMemo} from "react";
import {interestsCollection} from "../../data/interestsCollection.ts";
import {type RegistrationFormValues, registrationSchema} from "../../validation/registrationSchema.tsx";
import debounce from "lodash/debounce";

const RegistrationForm = () => {
    const [imageSrc, setImageSrc] = React.useState<string | null>(null);
    const [activeStep, setActiveStep] = React.useState(0);

    const {
        register,
        handleSubmit,
        control,
        trigger,
        watch,
        formState: {errors, isValid}
    } = useForm<RegistrationFormValues>({
        resolver: zodResolver(registrationSchema),
        mode: "onTouched",
        defaultValues: {
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: "",
            interests: [],
        },
    });

    // Create a debounced validation function for each field
    const debouncedValidateFields = useMemo(() => {
        const fields: Array<keyof RegistrationFormValues> = [
            "firstName",
            "lastName",
            "password",
            "confirmPassword",
            "interests"
        ];

        return fields.reduce((acc, field) => {
            acc[field] = debounce(() => {
                // Special case for password change affecting confirmPassword
                if (field === "password") {
                    const confirmPasswordValue = watch("confirmPassword");
                    if (confirmPasswordValue) {
                        trigger(["password", "confirmPassword"]);
                    } else {
                        trigger("password");
                    }
                } else {
                    trigger(field);
                }
            }, 500);

            return acc;
        }, {} as Record<keyof RegistrationFormValues, ReturnType<typeof debounce>>);
    }, [trigger, watch]);

    const handleFieldChange = (field: keyof RegistrationFormValues) => {
        return () => {
            debouncedValidateFields[field]();
        };
    };

    const onSubmit = (data: RegistrationFormValues) => {
        console.log(data);
    };

    const handleStepChange = (newStep: number) => {
        setActiveStep(newStep);
    };

    const Steps = [
        {
            id: 1,
            title: "Step 1",
            content: (
                <Flex direction="column" gap="16px">
                    <InputComponent
                        invalid={!!errors.firstName}
                        register={register("firstName", {onChange: handleFieldChange("firstName")})}
                        errorMessage={errors.firstName?.message}
                        label="First Name"
                    />
                    <InputComponent
                        invalid={!!errors.lastName}
                        register={register("lastName", {onChange: handleFieldChange("lastName")})}
                        errorMessage={errors.lastName?.message}
                        label="Last Name"
                    />
                    <PasswordInputComponent
                        invalid={!!errors.password}
                        register={register("password", {onChange: handleFieldChange("password")})}
                        errorMessage={errors.password?.message}
                        label="Password"
                    />
                    <PasswordInputComponent
                        invalid={!!errors.confirmPassword}
                        register={register("confirmPassword", {onChange: handleFieldChange("confirmPassword")})}
                        errorMessage={errors.confirmPassword?.message}
                        label="Confirm Password"
                    />
                    <SelectComponent name="interests" placeholder="Select interests" invalid={!!errors.interests}
                                     collections={interestsCollection} isMultiple={true}
                                     label="Interests" errorMessage={errors.interests?.message} control={control}/>
                </Flex>
            )
        },
        {
            id: 2,
            title: "Step 2",
            content: (
                <Flex direction="column" gap="16px" align="center">
                    <AvatarImage size="2xl" name={watch("firstName")} src={imageSrc ?? undefined}/>
                    <UploadImage onFileSelect={setImageSrc}/>
                </Flex>
            )
        }
    ]

    return (
        <form onSubmit={handleSubmit(onSubmit)} role="form">
            <StepsComponent steps={Steps} disabled={!isValid} activeStep={activeStep} onStepChange={handleStepChange}/>
        </form>
    );
};

export default RegistrationForm;
