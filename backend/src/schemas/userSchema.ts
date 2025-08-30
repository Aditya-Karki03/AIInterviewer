import z from "zod";

const userSchema = z.object({
  email: z.string().email({ message: "Invalid Email address" }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters long",
    })
    .max(100, {
      message: "Password must be at most 100 characters long",
    }),
});

export default userSchema;
