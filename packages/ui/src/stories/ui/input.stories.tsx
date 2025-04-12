import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@workspace/ui/components/ui/input';
import { Label } from '@radix-ui/react-label';

/**
 * Input components are used to collect data from users.
 */
const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A form input component for collecting user data with various states and variations.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'search', 'tel', 'url', 'file'],
      description: 'The type of input'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled'
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

/**
 * Default input with text type
 */
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    type: 'text',
  },
};

/**
 * Disabled input that cannot be interacted with
 */
export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};

/**
 * File input for uploading files
 */
export const File: Story = {
  args: {
    type: 'file',
    className: 'cursor-pointer',
  },
};

/**
 * Input with a label for better accessibility
 */
export const WithLabel: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="Enter your email" {...args} />
    </div>
  ),
}; 