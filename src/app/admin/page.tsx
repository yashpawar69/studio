"use client";

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Image as ImageIcon, Loader2, Wand2 } from "lucide-react";
import { generateImageAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

function GenerateProductImage() {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast({
        title: "Missing Description",
        description: "Please enter a description for the image.",
        variant: "destructive",
      });
      return;
    }
    startTransition(async () => {
      const result = await generateImageAction(prompt);
      if ('error' in result) {
        toast({
          title: "Image Generation Failed",
          description: result.error,
          variant: "destructive",
        });
        setGeneratedImage(null);
      } else {
        setGeneratedImage(result.imageUrl);
        toast({
          title: "Image Generated!",
          description: "Your new product image is ready.",
        });
      }
    });
  };

  return (
    <Card className="mt-8 shadow-md hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center">
          <Wand2 className="mr-2 h-5 w-5" />
          AI Product Image Generator
        </CardTitle>
        <CardDescription>
          Describe a clothing item to generate a unique, professional product image.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input 
            placeholder="e.g., A stylish red floral maxi dress"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isPending}
          />
          <Button onClick={handleGenerate} disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Image'
            )}
          </Button>
          
          {isPending && (
             <div className="flex items-center justify-center p-8 text-muted-foreground">
                <p>Generating your image, this may take a moment...</p>
             </div>
          )}

          {generatedImage && !isPending && (
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Generated Image:</h4>
              <div className="relative aspect-square w-full max-w-sm mx-auto border rounded-lg overflow-hidden shadow-sm">
                <Image 
                  src={generatedImage} 
                  alt="AI generated product image" 
                  layout="fill"
                  objectFit="cover"
                  className="bg-gray-100"
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}


export default function AdminPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between mb-8">
        <h1 className="font-headline text-3xl md:text-4xl font-bold flex items-center">
          <ShieldCheck className="mr-3 h-8 w-8 text-primary" />
          Admin Dashboard
        </h1>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Welcome, Admin!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            This is the main content area for the admin dashboard. You can add various admin-specific components and features here.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">View and manage application users.</p>
              </CardContent>
            </Card>
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Product Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Add, edit, or remove products.</p>
              </CardContent>
            </Card>
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Site Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Configure application settings.</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <GenerateProductImage />

    </div>
  );
}
