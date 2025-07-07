import z from "zod";

export const userSchemaZod=z.object({
    name:z.string().min(3, 'Name is required'),
    email:z.string().email('Email must be valid'),
    password:z.string()
    .min(6, 'Password must contain at least 7 characters')
    .max(15, 'Password must be most 15 characters')
    // .regex(/[a-z]/, "Password must include at least one lowercase letter")
    // .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    // .regex(/[0-9]/, "Password must include at least one number")
    // .regex(/[\W_]/, "Password must include at least one special character (!@#$%^&* etc.)")
    .refine((val) => !val.toLowerCase().includes("password"), {
    message: "Password should not contain the word 'password'"
})
})