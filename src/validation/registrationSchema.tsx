import {z} from "zod";

export const registrationSchema = z
    .object({
        firstName: z
            .string()
            .min(2, {message: "First name must be at least 2 characters"})
            .max(50, {message: "First name cannot exceed 50 characters"})
            .regex(/^[a-zA-Z\s'-]+$/, {
                message: "First name can only contain letters, spaces, hyphens, or apostrophes",
            })
            .trim(),
        lastName: z
            .string()
            .min(2, {message: "Last name must be at least 2 characters"})
            .max(50, {message: "Last name cannot exceed 50 characters"})
            .regex(/^[a-zA-Z\s'-]+$/, {
                message: "Last name can only contain letters, spaces, hyphens, or apostrophes",
            })
            .trim(),
        password: z
            .string()
            .min(8, {message: "Password must be at least 8 characters"})
            .max(100, {message: "Password cannot exceed 100 characters"})
            .regex(/[A-Z]/, {message: "Password must contain at least one uppercase letter"})
            .regex(/[a-z]/, {message: "Password must contain at least one lowercase letter"})
            .regex(/[0-9]/, {message: "Password must contain at least one number"})
            .regex(/[!@#$%^&*(),.?":{}|<>]/, {
                message: "Password must contain at least one special character",
            })
            .trim(),
        confirmPassword: z
            .string()
            .min(8, {message: "Confirm password must be at least 8 characters"})
            .max(100, {message: "Confirm password cannot exceed 100 characters"})
            .trim(),
        interests: z
            .array(z.string())
            .max(2, {message: "You can select up to 2 interests"})
            .min(1, {message: "Please select at least 1 interest"}),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
