@custom-variant dark (&:is(.dark *));

:root {
  --font-size: 14px;
  --background: #F8F9FA;
  --foreground: #333333;
  --card: #ffffff;
  --card-foreground: #333333;
  --popover: #ffffff;
  --popover-foreground: #333333;
  --primary: #001F3F;
  --primary-foreground: #ffffff;
  --secondary: #007BFF;
  --secondary-foreground: #ffffff;
  --muted: #E9ECEF;
  --muted-foreground: #6C757D;
  --accent: #007BFF;
  --accent-foreground: #ffffff;
  --destructive: #dc3545;
  --destructive-foreground: #ffffff;
  --border: rgba(0, 0, 0, 0.1);
  --input: transparent;
  --input-background: #ffffff;
  --switch-background: #cbced4;
  --font-weight-medium: 500;
  --font-weight-normal: 400;
  --ring: #007BFF;
  --chart-1: #001F3F;
  --chart-2: #007BFF;
  --chart-3: #20C997;
  --chart-4: #FFC107;
  --chart-5: #DC3545;
  --radius: 0.625rem;
  --sidebar: #ffffff;
  --sidebar-foreground: #333333;
  --sidebar-primary: #001F3F;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #F8F9FA;
  --sidebar-accent-foreground: #333333;
  --sidebar-border: rgba(0, 0, 0, 0.1);
  --sidebar-ring: #007BFF;
}

.dark {
  --background: #121212;
  --foreground: #E9ECEF;
  --card: #1E1E1E;
  --card-foreground: #E9ECEF;
  --popover: #1E1E1E;
  --popover-foreground: #E9ECEF;
  --primary: #007BFF;
  --primary-foreground: #ffffff;
  --secondary: #28A745;
  --secondary-foreground: #ffffff;
  --muted: #2D2D2D;
  --muted-foreground: #ADB5BD;
  --accent: #007BFF;
  --accent-foreground: #ffffff;
  --destructive: #dc3545;
  --destructive-foreground: #ffffff;
  --border: rgba(255, 255, 255, 0.1);
  --input: #2D2D2D;
  --ring: #007BFF;
  --font-weight-medium: 500;
  --font-weight-normal: 400;
  --chart-1: #007BFF;
  --chart-2: #28A745;
  --chart-3: #20C997;
  --chart-4: #FFC107;
  --chart-5: #DC3545;
  --sidebar: #1E1E1E;
  --sidebar-foreground: #E9ECEF;
  --sidebar-primary: #007BFF;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #2D2D2D;
  --sidebar-accent-foreground: #E9ECEF;
  --sidebar-border: rgba(255, 255, 255, 0.1);
  --sidebar-ring: #007BFF;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-input-background: var(--input-background);
  --color-switch-background: var(--switch-background);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground;
  }
}

/**
 * Base typography. This is not applied to elements which have an ancestor with a Tailwind text class.
 */
@layer base {
  :where(:not(:has([class*=" text-"]), :not(:has([class^="text-"])))) {
    h1 {
      font-size: var(--text-2xl);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    h2 {
      font-size: var(--text-xl);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    h3 {
      font-size: var(--text-lg);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    h4 {
      font-size: var(--text-base);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    p {
      font-size: var(--text-base);
      font-weight: var(--font-weight-normal);
      line-height: 1.5;
    }

    label {
      font-size: var(--text-base);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    button {
      font-size: var(--text-base);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    input {
      font-size: var(--text-base);
      font-weight: var(--font-weight-normal);
      line-height: 1.5;
    }
  }
}

html {
  font-size: var(--font-size);
}
