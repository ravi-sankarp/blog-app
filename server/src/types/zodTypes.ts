import { z } from "zod";

export const userRegisterSchema = z
  .object({
    email: z.string().email({ message: "Please provide a valid email" }).trim(),
    userName: z
      .string()
      .min(5, { message: "Username must be atleast 5 characters" })
      .max(15, { message: "Username must be less than 15 characters" })
      .trim(),
    firstName: z
      .string()
      .min(4, { message: "First Name must be atleast 4 characters" })
      .max(10, { message: "First Name must be less than 10 characters" }),
    lastName: z
      .string()
      .min(1, { message: "Last Name must be atleast 1 character" })
      .max(15, { message: "Last Name must be less than 15 characters" }),
    password: z
      .string()
      .min(5, { message: "Password must be atleast 5 characters" })
      .max(15, { message: "Password must be less than 15 characters" })
      .trim(),
    confirmPassword: z.string(),
    phoneNumber: z
      .string()
      .regex(/^[6-9]\d{9}$/, { message: "Please enter a valid phone number" })
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords does not match",
    path: ["confirmpassword"],
  });

export type userRegisterType = z.infer<typeof userRegisterSchema>;

export const userLoginSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email address" }),
  password: z.string()
    .min(5, { message: "Password must be atleast 5 characters" })
    .max(15, { message: "Password must be less than 15 characters" })
    .trim(),
});

export type userLoginType=z.infer<typeof userLoginSchema>