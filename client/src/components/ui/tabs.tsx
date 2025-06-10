
import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const tabsListVariants = cva(
  "inline-flex items-center justify-center p-1.5 text-muted-foreground shadow-lg border border-border/50",
  {
    variants: {
      variant: {
        default: "h-12 rounded-xl bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900",
        modern: "h-14 rounded-2xl bg-gradient-to-r from-background via-accent/30 to-background backdrop-blur-sm",
        minimal: "h-10 rounded-lg bg-muted/50 border-0 shadow-sm",
        colorful: "h-12 rounded-xl bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950",
        glass: "h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-6 py-2.5 text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-500/25 data-[state=active]:scale-105 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950 dark:hover:to-purple-950 hover:text-foreground transform",
        modern: "data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-primary-foreground data-[state=active]:shadow-xl data-[state=active]:shadow-primary/30 data-[state=active]:scale-[1.02] hover:bg-accent/50 hover:text-accent-foreground transform rounded-xl",
        minimal: "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm hover:bg-accent/50 hover:text-accent-foreground rounded-md",
        colorful: "data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:via-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-purple-500/30 data-[state=active]:scale-105 hover:bg-gradient-to-r hover:from-pink-50 hover:via-purple-50 hover:to-indigo-50 dark:hover:from-pink-950 dark:hover:via-purple-950 dark:hover:to-indigo-950 transform",
        glass: "data-[state=active]:bg-white/20 data-[state=active]:backdrop-blur-sm data-[state=active]:text-foreground data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-white/30 hover:bg-white/10 hover:backdrop-blur-sm transform rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const tabsContentVariants = cva(
  "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 p-6 shadow-lg border border-border/50 animate-fade-in",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-xl",
        modern: "bg-gradient-to-br from-background via-accent/5 to-background rounded-2xl shadow-xl",
        minimal: "bg-background rounded-lg shadow-sm border-0",
        colorful: "bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-blue-950/50 dark:via-purple-950/50 dark:to-pink-950/50 rounded-xl",
        glass: "bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

export interface TabsContentProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>,
    VariantProps<typeof tabsContentVariants> {}

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ variant }), className)}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ variant }), className)}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(tabsContentVariants({ variant }), className)}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }