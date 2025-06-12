"use client";

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Loader2 } from 'lucide-react';
import { generateStyleSuggestionsAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import type { GenerateStyleSuggestionsInput } from '@/ai/flows/generate-style-suggestions';

interface AiStylistSectionProps {
  initialBrowsingHistory?: string;
}

export default function AiStylistSection({ initialBrowsingHistory = "" }: AiStylistSectionProps) {
  const [browsingHistory, setBrowsingHistory] = useState(initialBrowsingHistory);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!browsingHistory.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide some browsing history or style preferences.",
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      const input: GenerateStyleSuggestionsInput = {
        browsingHistory,
        numberOfSuggestions: 3,
      };
      const result = await generateStyleSuggestionsAction(input);

      if ('error' in result) {
        toast({
          title: "AI Stylist Error",
          description: result.error,
          variant: "destructive",
        });
        setSuggestions([]);
      } else {
        setSuggestions(result.suggestions);
         toast({
          title: "Style Suggestions Ready!",
          description: "Check out your personalized style tips.",
        });
      }
    });
  };

  return (
    <Card className="mt-12">
      <CardHeader>
        <CardTitle className="flex items-center font-headline text-2xl">
          <Sparkles className="mr-2 h-6 w-6 text-primary" />
          AI Personal Stylist
        </CardTitle>
        <CardDescription>
          Tell us about your style or recent finds, and get personalized recommendations!
          (e.g., "I've been looking at floral dresses and chunky sneakers.")
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Describe your browsing history or style preferences..."
          value={browsingHistory}
          onChange={(e) => setBrowsingHistory(e.target.value)}
          rows={3}
          className="mb-4"
        />
        <Button onClick={handleSubmit} disabled={isPending} className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Getting Suggestions...
            </>
          ) : (
            'Get Style Ideas'
          )}
        </Button>
      </CardContent>
      {suggestions.length > 0 && (
        <CardFooter className="flex-col items-start gap-2 pt-4 border-t">
          <h4 className="font-semibold text-md">Style Tips:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </CardFooter>
      )}
    </Card>
  );
}
