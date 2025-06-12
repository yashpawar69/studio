"use server";

import { generateStyleSuggestions } from '@/ai/flows/generate-style-suggestions';
import type { GenerateStyleSuggestionsInput, GenerateStyleSuggestionsOutput } from '@/ai/flows/generate-style-suggestions';

export async function generateStyleSuggestionsAction(
  input: GenerateStyleSuggestionsInput
): Promise<GenerateStyleSuggestionsOutput | { error: string }> {
  try {
    // Validate input if necessary (though Zod does this in the flow)
    if (!input.browsingHistory || input.browsingHistory.trim() === "") {
      return { error: "Browsing history cannot be empty." };
    }
    if (input.numberOfSuggestions && (input.numberOfSuggestions < 1 || input.numberOfSuggestions > 10) ) {
       return { error: "Number of suggestions must be between 1 and 10." };
    }

    const result = await generateStyleSuggestions(input);
    return result;
  } catch (error) {
    console.error("Error generating style suggestions:", error);
    // It's good practice to not expose raw error messages to the client
    return { error: "Failed to generate style suggestions. Please try again." };
  }
}
