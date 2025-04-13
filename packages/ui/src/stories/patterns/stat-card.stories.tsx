import { Meta, StoryObj } from '@storybook/react';
import { IconTrendingUp, IconTrendingDown, IconUsers } from '@tabler/icons-react';

import { StatCard } from '@workspace/ui/components/patterns/stat-card';

const meta = {
  title: 'Patterns/StatCard',
  component: StatCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A card component specifically designed for displaying statistics or KPIs.',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    value: { control: 'text' },
    change: { 
      control: 'object'
    },
    icon: { control: false },
    description: { control: 'text' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Positive trend stat card
export const Positive: Story = {
  args: {
    title: 'Total Revenue',
    value: '$1,250.00',
    change: {
      value: '+12.5%',
      direction: 'up',
    },
    description: 'from last month',
    icon: <IconTrendingUp className="size-4 text-muted-foreground" />,
  },
};

// Negative trend stat card
export const Negative: Story = {
  args: {
    title: 'New Customers',
    value: '1,234',
    change: {
      value: '-20%',
      direction: 'down',
    },
    description: 'from last month',
    icon: <IconTrendingDown className="size-4 text-muted-foreground" />,
  },
};

// Stat card with just a value
export const NoChange: Story = {
  args: {
    title: 'Active Users',
    value: '45,678',
    icon: <IconUsers className="size-4 text-muted-foreground" />,
  },
}; 