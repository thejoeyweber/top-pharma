import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@workspace/ui/components/ui/button';
import { Mail } from 'lucide-react';

/**
 * Buttons are used to trigger actions or events, such as submitting a form,
 * opening a dialog, canceling an action, or performing a delete operation.
 */
const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A button component for user interactions. Available in various styles and sizes.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'The visual style of the button'
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'The size of the button'
    },
    asChild: {
      control: 'boolean',
      description: 'Whether to render as a child component (e.g., for Link)'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    },
    children: {
      control: 'text',
      description: 'The content of the button'
    }
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

// Base variants
/**
 * The default button style with primary color
 */
export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'default',
  },
};

/**
 * Secondary style for less prominent actions
 */
export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

/**
 * Destructive style for dangerous or negative actions
 */
export const Destructive: Story = {
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
};

/**
 * Outlined style with border and transparent background
 */
export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

/**
 * Ghost style that only shows on hover
 */
export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
  },
};

/**
 * Link style that resembles a hyperlink
 */
export const Link: Story = {
  args: {
    children: 'Link',
    variant: 'link',
  },
};

// Size variants
/**
 * Small size button
 */
export const Small: Story = {
  args: {
    children: 'Small',
    size: 'sm',
  },
};

/**
 * Large size button
 */
export const Large: Story = {
  args: {
    children: 'Large',
    size: 'lg',
  },
};

// Icon variants
/**
 * Button with icon and text
 */
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Mail className="mr-2" /> Login with Email
      </>
    ),
  },
};

/**
 * Icon-only button
 */
export const IconOnly: Story = {
  args: {
    size: 'icon',
    children: <Mail />,
    'aria-label': 'Send email',
  },
};

// State variants
/**
 * Disabled button to indicate loading or processing
 */
export const Loading: Story = {
  args: {
    children: 'Please wait',
    disabled: true,
  },
}; 