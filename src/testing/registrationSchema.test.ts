import { describe, test, expect } from "vitest";
import { type RegistrationFormValues, registrationSchema } from "../validation/registrationSchema";

describe("registrationSchema", () => {
  // Valid form data for baseline testing
  const validData: RegistrationFormValues = {
    firstName: "John",
    lastName: "Doe",
    password: "Password123!",
    confirmPassword: "Password123!",
    interests: ["coding"],
  };

  test("validates correct form data", () => {
    const result = registrationSchema.safeParse(validData);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validData);
  });

  // firstName tests
  test("rejects firstName shorter than 2 characters", () => {
    const result = registrationSchema.safeParse({
      ...validData,
      firstName: "J",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("First name must be at least 2 characters");
  });

  test("rejects firstName longer than 50 characters", () => {
    const longName = "A".repeat(51);
    const result = registrationSchema.safeParse({
      ...validData,
      firstName: longName,
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("First name cannot exceed 50 characters");
  });

  test("rejects firstName with invalid characters", () => {
    const result = registrationSchema.safeParse({
      ...validData,
      firstName: "John123",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
        "First name can only contain letters, spaces, hyphens, or apostrophes"
    );
  });

  test("trims whitespace from firstName", () => {
    const result = registrationSchema.safeParse({
      ...validData,
      firstName: "  John  ",
    });
    expect(result.success).toBe(true);
    expect(result.data?.firstName).toBe("John");
  });

  // lastName tests
  test("rejects lastName shorter than 2 characters", () => {
    const result = registrationSchema.safeParse({
      ...validData,
      lastName: "D",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Last name must be at least 2 characters");
  });

  test("rejects lastName longer than 50 characters", () => {
    const longName = "A".repeat(51);
    const result = registrationSchema.safeParse({
      ...validData,
      lastName: longName,
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Last name cannot exceed 50 characters");
  });

  test("rejects lastName with invalid characters", () => {
    const result = registrationSchema.safeParse({
      ...validData,
      lastName: "Doe123",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
        "Last name can only contain letters, spaces, hyphens, or apostrophes"
    );
  });

  test("trims whitespace from lastName", () => {
    const result = registrationSchema.safeParse({
      ...validData,
      lastName: "  Doe  ",
    });
    expect(result.success).toBe(true);
    expect(result.data?.lastName).toBe("Doe");
  });

  // password tests
  test("rejects password shorter than 8 characters", () => {
    const result = registrationSchema.safeParse({
      ...validData,
      password: "Pass1!",
      confirmPassword: "Pass1!",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Password must be at least 8 characters");
  });

  test("rejects password longer than 100 characters", () => {
    const longPassword = "A".repeat(101);
    const result = registrationSchema.safeParse({
      ...validData,
      password: longPassword,
      confirmPassword: longPassword,
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Password cannot exceed 100 characters");
  });

  test("rejects password without uppercase letter", () => {
    const result = registrationSchema.safeParse({
      ...validData,
      password: "password123!",
      confirmPassword: "password123!",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
        "Password must contain at least one uppercase letter"
    );
  });

  test("rejects password without lowercase letter", () => {
    const result = registrationSchema.safeParse({
      ...validData,
      password: "PASSWORD123!",
      confirmPassword: "PASSWORD123!",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
        "Password must contain at least one lowercase letter"
    );
  });

  test("rejects password without number", () => {
    const result = registrationSchema.safeParse({
      ...validData,
      password: "Password!",
      confirmPassword: "Password!",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Password must contain at least one number");
  });

  test("rejects password without special character", () => {
    const result = registrationSchema.safeParse({
      ...validData,
      password: "Password123",
      confirmPassword: "Password123",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
        "Password must contain at least one special character"
    );
  });

  test("trims whitespace from password", () => {
    const result = registrationSchema.safeParse({
      ...validData,
      password: "  Password123!  ",
      confirmPassword: "  Password123!  ",
    });
    expect(result.success).toBe(true);
    expect(result.data?.password).toBe("Password123!");
  });

  // confirmPassword tests
  test("rejects confirmPassword shorter than 8 characters", () => {
    const result = registrationSchema.safeParse({
      ...validData,
      confirmPassword: "Pass1!",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
        "Confirm password must be at least 8 characters"
    );
  });

  test("rejects confirmPassword longer than 100 characters", () => {
    const longPassword = "A".repeat(101);
    const result = registrationSchema.safeParse({
      ...validData,
      confirmPassword: longPassword,
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
        "Confirm password cannot exceed 100 characters"
    );
  });

  test("rejects when passwords do not match", () => {
    const result = registrationSchema.safeParse({
      ...validData,
      confirmPassword: "Different123!",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Passwords do not match");
    expect(result.error?.issues[0].path).toEqual(["confirmPassword"]);
  });

  test("trims whitespace from confirmPassword", () => {
    const result = registrationSchema.safeParse({
      ...validData,
      confirmPassword: "  Password123!  ",
    });
    expect(result.success).toBe(true);
    expect(result.data?.confirmPassword).toBe("Password123!");
  });

  // interests tests
  test("rejects empty interests array", () => {
    const result = registrationSchema.safeParse({
      ...validData,
      interests: [],
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Please select at least 1 interest");
  });

  test("rejects interests array with more than 2 items", () => {
    const result = registrationSchema.safeParse({
      ...validData,
      interests: ["coding", "gaming", "reading"],
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("You can select up to 2 interests");
  });

  test("accepts interests array with 1 or 2 items", () => {
    const result1 = registrationSchema.safeParse({
      ...validData,
      interests: ["coding"],
    });
    expect(result1.success).toBe(true);
    expect(result1.data?.interests).toEqual(["coding"]);

    const result2 = registrationSchema.safeParse({
      ...validData,
      interests: ["coding", "gaming"],
    });
    expect(result2.success).toBe(true);
    expect(result2.data?.interests).toEqual(["coding", "gaming"]);
  });

  // edge cases
  test("rejects missing required fields", () => {
    const result = registrationSchema.safeParse({});
    expect(result.success).toBe(false);
    expect(result.error?.issues.length).toBe(5); // One for each required field
    expect(result.error?.issues.map((issue) => issue.path[0])).toEqual([
      "firstName",
      "lastName",
      "password",
      "confirmPassword",
      "interests",
    ]);
  });

  test("handles null and undefined inputs gracefully", () => {
    const result = registrationSchema.safeParse({
      firstName: null,
      lastName: undefined,
      password: null,
      confirmPassword: undefined,
      interests: null,
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues.length).toBeGreaterThan(0);
    expect(result.error?.issues[0].message).toContain("Expected string, received null");
  });
});
