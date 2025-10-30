"use server";

import { z } from "zod";
import { API_CONFIG } from "@/config";

const FormSchema = z.object({
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
});

export type State = {
  errors?: {
    content?: string[];
    server?: string[];
  };
  message?: string | null;
  data?: {
    predicted_class: number;
    probability: number;
  } | null;
};

export async function handleTextScan(prevState: State, formData: FormData): Promise<State> {
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
    // Build FormData to send to edge function (which forwards to AI server)
    const payload = new FormData();
    payload.append("text", content);

    // Call the Supabase edge function with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

    const response = await fetch(API_CONFIG.edgeFunctionUrl, {
      method: "POST",
      headers: {
        "endpoint": "/predict", // Tell forwarder which AI endpoint to call
      },
      body: payload,
      signal: controller.signal,
    }).finally(() => clearTimeout(timeoutId));

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: `Server error: ${response.status}` }));
      throw new Error(errorData.detail || `Request failed with status ${response.status}`);
    }

    const result = await response.json();

    return {
      message: "Analysis successful.",
      data: {
        predicted_class: result.predicted_class,
        probability: result.probability,
      },
    };
  } catch (error) {
    console.error("AI analysis failed:", error);
    
    if (error instanceof Error && error.name === 'AbortError') {
      return {
        message: "Request timed out. Please try again.",
        errors: { server: ["Request took too long"] },
        data: null,
      };
    }

    return {
      message: "An error occurred during analysis. Please try again.",
      errors: { server: [error instanceof Error ? error.message : "Unknown error"] },
      data: null,
    };
  }
}
