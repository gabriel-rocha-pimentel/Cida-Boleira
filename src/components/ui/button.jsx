
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import React from 'react';

const buttonVariants = cva(
	'inline-flex items-center justify-center rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform active:scale-95',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg', // Gold button
				destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md hover:shadow-lg',
				outline:
          'border border-input bg-transparent hover:bg-accent/10 hover:text-accent-foreground shadow-sm hover:shadow-md', // Accent is burnt-orange
				secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-md hover:shadow-lg', // Cream button
				ghost: 'hover:bg-accent/10 hover:text-accent-foreground', // Burnt orange text on hover
				link: 'text-primary underline-offset-4 hover:underline hover:text-primary/80', // Gold link
        cta: 'bg-brand-burnt-orange text-brand-cream font-semibold shadow-cta hover:bg-opacity-90 hover:scale-105',
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-lg px-3',
				lg: 'h-11 rounded-xl px-8 text-base',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	const Comp = asChild ? Slot : 'button';
	return (
		<Comp
			className={cn(buttonVariants({ variant, size, className }))}
			ref={ref}
			{...props}
		/>
	);
});
Button.displayName = 'Button';

export { Button, buttonVariants };
