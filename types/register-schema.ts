import * as z from "zod";

export const registerSchema = z.object({
   name:z.string().min(4,{message:"Name must be at least 4 characters"}),
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" }),
})  