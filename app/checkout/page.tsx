'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import CheckoutSummary from '@/components/checkout/checkout-summary';
import ShippingForm from '@/components/checkout/shipping-form';
import BillingForm from '@/components/checkout/billing-form';
import { Separator } from '@/components/ui/separator';
import { Check, CreditCard, Truck } from 'lucide-react';
import { Steps } from '@/components/checkout/steps';
import { formatCurrency } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import EmptyCart from '@/components/cart/empty-cart';

const formSchema = z.object({
  // Shipping information
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'Zip code is required'),
  country: z.string().min(2, 'Country is required'),
  
  // Billing information
  sameAsShipping: z.boolean().default(true),
  billingFullName: z.string().optional(),
  billingAddress: z.string().optional(),
  billingCity: z.string().optional(),
  billingState: z.string().optional(),
  billingZipCode: z.string().optional(),
  billingCountry: z.string().optional(),
  
  // Payment information
  cardNumber: z.string().min(16, 'Card number is required'),
  cardName: z.string().min(2, 'Name on card is required'),
  expiryDate: z.string().min(5, 'Expiry date is required'),
  cvv: z.string().min(3, 'CVV is required'),
});

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sameAsShipping: true,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      return;
    }
    
    // Process the order
    console.log('Order submitted:', values);
    
    // Show success message and clear cart
    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase.",
    });
    
    clearCart();
    router.push('/');
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="animate-fadeIn py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-semibold">Checkout</h1>
        
        <Steps currentStep={currentStep} />
        
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {currentStep === 1 && (
                  <div className="space-y-6 rounded-lg border bg-card p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white">
                        <Truck className="h-4 w-4" />
                      </div>
                      <h2 className="text-xl font-medium">Shipping Information</h2>
                    </div>
                    
                    <Separator />
                    
                    <ShippingForm form={form} />
                    
                    <div className="flex justify-end">
                      <Button type="submit" className="bg-accent hover:bg-accent/90">
                        Continue to Billing
                      </Button>
                    </div>
                  </div>
                )}
                
                {currentStep === 2 && (
                  <div className="space-y-6 rounded-lg border bg-card p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white">
                        <CreditCard className="h-4 w-4" />
                      </div>
                      <h2 className="text-xl font-medium">Billing Information</h2>
                    </div>
                    
                    <Separator />
                    
                    <BillingForm form={form} />
                    
                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={goToPreviousStep}>
                        Back to Shipping
                      </Button>
                      <Button type="submit" className="bg-accent hover:bg-accent/90">
                        Continue to Review
                      </Button>
                    </div>
                  </div>
                )}
                
                {currentStep === 3 && (
                  <div className="space-y-6 rounded-lg border bg-card p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white">
                        <Check className="h-4 w-4" />
                      </div>
                      <h2 className="text-xl font-medium">Review Order</h2>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium">Shipping Address</h3>
                        <p className="text-muted-foreground">
                          {form.watch('fullName')}<br />
                          {form.watch('address')}<br />
                          {form.watch('city')}, {form.watch('state')} {form.watch('zipCode')}<br />
                          {form.watch('country')}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium">Payment Method</h3>
                        <p className="text-muted-foreground">
                          Credit Card ending in {form.watch('cardNumber').slice(-4)}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium">Order Summary</h3>
                        <ul className="space-y-2 text-sm">
                          {cartItems.map((item) => (
                            <li key={item.id} className="flex justify-between">
                              <span>
                                {item.name} x {item.quantity}
                              </span>
                              <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={goToPreviousStep}>
                        Back to Billing
                      </Button>
                      <Button type="submit" className="bg-accent hover:bg-accent/90">
                        Place Order
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </Form>
          </div>

          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
}