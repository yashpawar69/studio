
import CheckoutForm from '@/components/checkout/CheckoutForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <header className="mb-8 text-center">
        <h1 className="font-headline text-3xl md:text-4xl font-bold flex items-center justify-center">
          <ShoppingCart className="mr-3 h-8 w-8 text-primary" />
          Checkout
        </h1>
        <p className="text-muted-foreground mt-2">
          Please fill in your details to complete your purchase.
        </p>
      </header>
      
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
          <CardDescription>Review your information before placing the order.</CardDescription>
        </CardHeader>
        <CardContent>
          <CheckoutForm />
        </CardContent>
      </Card>
    </div>
  );
}
