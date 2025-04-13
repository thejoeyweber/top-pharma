import { Meta, StoryObj } from '@storybook/react';
import { 
  IconTrendingUp, 
  IconTrendingDown, 
  IconUsers, 
  IconCreditCard 
} from '@tabler/icons-react';

import { StatCardGrid } from '@workspace/ui/components/patterns/stat-card-grid';

const meta = {
  title: 'Patterns/StatCardGrid',
  component: StatCardGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A responsive grid for displaying multiple stat cards.',
      },
    },
  },
  argTypes: {
    cards: { control: 'object' },
    columns: { control: 'object' },
    gap: { control: 'text' },
    padding: { control: 'text' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StatCardGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FourCards: Story = {
  args: {
    cards: [
      {
        title: 'Total Revenue',
        value: '$1,250.00',
        change: {
          value: '+12.5%',
          direction: 'up',
        },
        description: 'from last month',
        icon: <IconTrendingUp className="size-4 text-muted-foreground" />,
      },
      {
        title: 'New Customers',
        value: '1,234',
        change: {
          value: '-20%',
          direction: 'down',
        },
        description: 'from last month',
        icon: <IconTrendingDown className="size-4 text-muted-foreground" />,
      },
      {
        title: 'Active Users',
        value: '45,678',
        change: {
          value: '+12.5%',
          direction: 'up',
        },
        description: 'from last month',
        icon: <IconUsers className="size-4 text-muted-foreground" />,
      },
      {
        title: 'Total Sales',
        value: '2,345',
        change: {
          value: '+18.2%',
          direction: 'up',
        },
        description: 'from last month',
        icon: <IconCreditCard className="size-4 text-muted-foreground" />,
      }
    ],
    columns: {
      sm: 1,
      md: 2,
      lg: 4,
    },
  },
};

export const TwoColumns: Story = {
  args: {
    cards: [
      {
        title: 'Total Revenue',
        value: '$1,250.00',
        change: {
          value: '+12.5%',
          direction: 'up',
        },
        description: 'from last month',
        icon: <IconTrendingUp className="size-4 text-muted-foreground" />,
      },
      {
        title: 'New Customers',
        value: '1,234',
        change: {
          value: '-20%',
          direction: 'down',
        },
        description: 'from last month',
        icon: <IconTrendingDown className="size-4 text-muted-foreground" />,
      }
    ],
    columns: {
      sm: 1,
      md: 2,
    },
  },
}; 