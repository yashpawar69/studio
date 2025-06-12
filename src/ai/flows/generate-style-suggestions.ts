'use server';

/**
 * @fileOverview Generates style suggestions based on user browsing history.
 *
 * - generateStyleSuggestions - A function that generates style suggestions.
 * - GenerateStyleSuggestionsInput - The input type for the generateStyleSuggestions function.
 * - GenerateStyleSuggestionsOutput - The return type for the generateStyleSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStyleSuggestionsInputSchema = z.object({
  browsingHistory: z
    .string()
    .describe('The user browsing history, as a text description.'),
  numberOfSuggestions: z
    .number()
    .default(3)
    .describe('The number of style suggestions to generate.'),
});
export type GenerateStyleSuggestionsInput = z.infer<
  typeof GenerateStyleSuggestionsInputSchema
>;

const GenerateStyleSuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('A list of style suggestions based on the browsing history.'),
});
export type GenerateStyleSuggestionsOutput = z.infer<
  typeof GenerateStyleSuggestionsOutputSchema
>;

export async function generateStyleSuggestions(
  input: GenerateStyleSuggestionsInput
): Promise<GenerateStyleSuggestionsOutput> {
  return generateStyleSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStyleSuggestionsPrompt',
  input: {schema: GenerateStyleSuggestionsInputSchema},
  output: {schema: GenerateStyleSuggestionsOutputSchema},
  prompt: `You are a personal stylist. Based on the user's browsing history, you will generate style suggestions.

  Browsing History: {{{browsingHistory}}}

  Please provide {{numberOfSuggestions}} style suggestions. The style suggestions should be very short, just a few words.`,
});

const generateStyleSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateStyleSuggestionsFlow',
    inputSchema: GenerateStyleSuggestionsInputSchema,
    outputSchema: GenerateStyleSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
