import { cn } from '@/lib/utils';
import { Check, CreditCard, ShoppingBag, Truck } from 'lucide-react';

interface StepsProps {
  currentStep: number;
}

export function Steps({ currentStep }: StepsProps) {
  const steps = [
    {
      id: 1,
      name: 'Shipping',
      icon: Truck,
    },
    {
      id: 2,
      name: 'Billing',
      icon: CreditCard,
    },
    {
      id: 3,
      name: 'Review',
      icon: ShoppingBag,
    },
  ];

  return (
    <div className="relative mb-8">
      <div className="absolute inset-0 top-1/2 flex -translate-y-1/2 justify-center">
        <div className="h-0.5 w-full max-w-[300px] bg-border" />
      </div>
      
      <div className="relative flex justify-between">
        {steps.map((step) => {
          const isActive = currentStep >= step.id;
          const isComplete = currentStep > step.id;
          
          return (
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={cn(
                  "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2",
                  isActive
                    ? "border-accent bg-accent text-white"
                    : "border-border bg-background text-muted-foreground"
                )}
              >
                {isComplete ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <step.icon className="h-5 w-5" />
                )}
              </div>
              <span 
                className={cn(
                  "mt-2 text-sm font-medium",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}