"use server";

import { z } from "zod";
import { analyzeSuspiciousContent, type AnalyzeSuspiciousContentOutput } from "@/ai/flows/analyze-suspicious-content";

const FormSchema = z.object({
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
});

export type State = {
  errors?: {
    content?: string[];
  };
  message?: string | null;
  data?: AnalyzeSuspiciousContentOutput | null;
};

export async function handleTextScan(prevState: State, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    content: formData.get("content"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Analyze Content.",
      data: null,
    };
  }

  const { content } = validatedFields.data;

  try {
    const result = await analyzeSuspiciousContent({ content });
    return {
      message: "Analysis successful.",
      data: result,
    };
  } catch (error) {
    console.error("AI analysis failed:", error);
    return {
      message: "An error occurred during analysis. Please try again.",
      data: null,
    };
  }
}
