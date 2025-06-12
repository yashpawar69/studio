
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Package, User, Home, Mail, Phone } from "lucide-react";
import { useRouter } from 'next/navigation';

const addressSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  street: z.string().min(3, "Street address is required."),
  city: z.string().min(2, "City is required."),
  postalCode: z.string().min(3, "Postal code is required."),
  country: z.string().min(2, "Country is required."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(7, "Phone number is required.").optional(),
});

const checkoutFormSchema = z.object({
  shippingAddress: addressSchema,
  billingSameAsShipping: z.boolean().default(true),
  billingAddress: addressSchema.optional(),
  paymentDetails: z.object({
    cardNumber: z.string().regex(/^\d{16}$/, "Invalid card number (must be 16 digits).").describe("Mock Card Number (e.g., 4242...)"),
    expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date (MM/YY)."),
    cvc: z.string().regex(/^\d{3,4}$/, "Invalid CVC (3 or 4 digits)."),
  }),
}).refine(data => {
  if (!data.billingSameAsShipping && !data.billingAddress) {
    return false;
  }
  return true;
}, {
  message: "Billing address is required if not same as shipping.",
  path: ["billingAddress"], // Path to show error under
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

const defaultValues: Partial<CheckoutFormValues> = {
  shippingAddress: {
    fullName: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
    email: "",
    phone: "",
  },
  billingSameAsShipping: true,
  paymentDetails: {
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  }
};

export default function CheckoutForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const watchBillingSameAsShipping = form.watch("billingSameAsShipping");

  function onSubmit(data: CheckoutFormValues) {
    console.log("Checkout data:", data);
    toast({
      title: "Order Placed (Simulated)",
      description: "Thank you for your purchase! Your order is being processed.",
      variant: "default",
    });
    // Here you would typically redirect to a thank you page or order confirmation
    // For now, let's reset the form and perhaps redirect to home.
    form.reset();
    router.push('/'); 
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Shipping Address Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center text-primary">
            <Package className="mr-2 h-5 w-5" /> Shipping Information
          </h2>
          <FormField
            control={form.control}
            name="shippingAddress.fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shippingAddress.email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john.doe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shippingAddress.street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="shippingAddress.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Anytown" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shippingAddress.postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder="12345" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shippingAddress.country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="United States" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
           <FormField
            control={form.control}
            name="shippingAddress.phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number (Optional)</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+1 555-123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <Separator />

        {/* Billing Address Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center text-primary">
            <Home className="mr-2 h-5 w-5" /> Billing Information
          </h2>
          <FormField
            control={form.control}
            name="billingSameAsShipping"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Billing address is the same as shipping address
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          {!watchBillingSameAsShipping && (
            <div className="space-y-4 mt-4 p-4 border rounded-md shadow-sm bg-muted/30">
              <FormField
                control={form.control}
                name="billingAddress.fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="billingAddress.street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input placeholder="456 Oak Ave" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="billingAddress.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Otherville" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="billingAddress.postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input placeholder="67890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="billingAddress.country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="United States" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
        </section>

        <Separator />

        {/* Order Summary Placeholder */}
        <section className="space-y-2">
            <h2 className="text-xl font-semibold flex items-center text-primary">
                Order Summary
            </h2>
            <div className="p-4 border rounded-md bg-muted/50">
                <p className="text-sm text-muted-foreground">
                    Product 1 - $XX.XX <br />
                    Product 2 - $YY.YY <br />
                    <span className="font-semibold">Total: $ZZ.ZZ</span>
                </p>
                <FormDescription>
                    This is a placeholder. A real cart summary would go here.
                </FormDescription>
            </div>
        </section>
        
        <Separator />

        {/* Payment Details Section (Mock) */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center text-primary">
            <CreditCard className="mr-2 h-5 w-5" /> Payment Details (Mock)
          </h2>
          <FormDescription>
            This is for demonstration purposes only. Do not enter real card details.
          </FormDescription>
          <FormField
            control={form.control}
            name="paymentDetails.cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card Number</FormLabel>
                <FormControl>
                  <Input placeholder="0000 0000 0000 0000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="paymentDetails.expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <Input placeholder="MM/YY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentDetails.cvc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVC</FormLabel>
                  <FormControl>
                    <Input placeholder="123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <>
             <CreditCard className="mr-2 h-4 w-4 animate-pulse" /> Processing...
            </>
          ) : (
            <>
             <CreditCard className="mr-2 h-5 w-5" /> Place Order (Simulated)
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
