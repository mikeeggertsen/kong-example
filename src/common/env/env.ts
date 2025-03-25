import { z } from "zod";
import "dotenv/config";

export const envSchema = z.object({
  PORT: z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
