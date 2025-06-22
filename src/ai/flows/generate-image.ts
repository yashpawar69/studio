'use server';

/**
 * @fileOverview Generates an image based on a text prompt.
 *
 * - generateImage - A function that handles the image generation process.
 * - GenerateImageOutput - The return type for the generateImage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateImageOutputSchema = z.object({
  imageUrl: z
    .string()
    .describe('The data URI of the generated image.'),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImage(prompt: string): Promise<GenerateImageOutput> {
  return generateImageFlow(prompt);
}

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: z.string(),
    outputSchema: GenerateImageOutputSchema,
  },
  async (prompt) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Generate a high-quality, professional, photorealistic image of the following clothing item, suitable for an e-commerce website. The item should be presented on a clean, light-colored, neutral background. Do not include any models or mannequins. Focus solely on the clothing item. Description: ${prompt}`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media) {
      throw new Error('Image generation failed to return media.');
    }

    return { imageUrl: media.url };
  }
);
