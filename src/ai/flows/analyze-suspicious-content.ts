'use server';
/**
 * @fileOverview AI flow to analyze the likelihood of text-based content being part of a scam.
 *
 * - analyzeSuspiciousContent - Analyzes the content and returns a scam likelihood score with rationale.
 * - AnalyzeSuspiciousContentInput - The input type for the analyzeSuspiciousContent function.
 * - AnalyzeSuspiciousContentOutput - The return type for the analyzeSuspiciousContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSuspiciousContentInputSchema = z.object({
  content: z.string().describe('The text-based content to analyze for scam likelihood.'),
});
export type AnalyzeSuspiciousContentInput = z.infer<typeof AnalyzeSuspiciousContentInputSchema>;

const AnalyzeSuspiciousContentOutputSchema = z.object({
  scamLikelihoodScore: z.number().describe('A score (0-1) representing the likelihood of the content being part of a scam.'),
  rationale: z.string().describe('The rationale behind the assigned scam likelihood score.'),
});
export type AnalyzeSuspiciousContentOutput = z.infer<typeof AnalyzeSuspiciousContentOutputSchema>;

export async function analyzeSuspiciousContent(input: AnalyzeSuspiciousContentInput): Promise<AnalyzeSuspiciousContentOutput> {
  return analyzeSuspiciousContentFlow(input);
}

const analyzeSuspiciousContentPrompt = ai.definePrompt({
  name: 'analyzeSuspiciousContentPrompt',
  input: {schema: AnalyzeSuspiciousContentInputSchema},
  output: {schema: AnalyzeSuspiciousContentOutputSchema},
  prompt: `You are an AI assistant designed to analyze text-based content and determine the likelihood of it being part of a scam.

  Analyze the following content and provide a scam likelihood score between 0 and 1, where 0 is not a scam and 1 is definitely a scam. Also, provide a rationale for the assigned score.

  Content: {{{content}}}

  Ensure that the scamLikelihoodScore is a number between 0 and 1 and the rationale is a clear explanation for the assigned score.
  The response must be returned in JSON format.
  `,
});

const analyzeSuspiciousContentFlow = ai.defineFlow(
  {
    name: 'analyzeSuspiciousContentFlow',
    inputSchema: AnalyzeSuspiciousContentInputSchema,
    outputSchema: AnalyzeSuspiciousContentOutputSchema,
  },
  async input => {
    const {output} = await analyzeSuspiciousContentPrompt(input);
    return output!;
  }
);
