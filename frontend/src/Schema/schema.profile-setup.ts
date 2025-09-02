import z from "zod";

export const ProfileSetupSchema = z.object({
  job: z.string().min(2).max(100),
  experience: z.enum(["Entry", "Mid", "Senior"]),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  interviewType: z.string().min(2).max(100),
});
