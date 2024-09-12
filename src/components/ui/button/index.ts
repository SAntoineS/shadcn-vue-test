import {type VariantProps, cva} from 'class-variance-authority'

export {default as Button} from './Button.vue'

export const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground hover:bg-primary/90',
                warning: 'bg-warning text-warning-foreground hover:bg-warning/90',
                success: 'bg-success text-success-foreground hover:bg-success/90',
                information: 'bg-information text-information-foreground hover:bg-information/90',
                destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
                secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',

                tonal: 'bg-primary/10 text-primary hover:bg-primary/20',
                warningTonal: 'bg-warning/10 text-warning hover:bg-warning/20',
                successTonal: 'bg-success/10 text-success hover:bg-success/20',
                informationTonal: 'bg-information/10 text-information hover:bg-information/20',
                destructiveTonal: 'bg-destructive/10 text-destructive hover:bg-destructive/20',
                secondaryTonal: 'bg-secondary/10 text-secondary hover:bg-secondary/20',
            },
            size: {
                default: 'h-10 px-4 py-2',
                xs: 'h-7 rounded px-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
