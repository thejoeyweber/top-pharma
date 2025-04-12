import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { Button } from '@workspace/ui/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/ui/card';

/**
 * Cards are used to group related information. They can contain various content types 
 * including text, images, and controls.
 */
const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A card component that displays content with optional header and footer.'
      }
    }
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for styling',
    }
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

// Define prop types for our template
interface CardTemplateProps {
  title?: string;
  description?: string;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

// Create a template that accepts args
const CardTemplate: StoryFn<CardTemplateProps> = ({
  title,
  description,
  content,
  footer,
  className,
  ...args
}) => (
  <Card className={`w-[380px] ${className || ''}`} {...args}>
    {(title || description) && (
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
    )}
    {content && <CardContent>{content}</CardContent>}
    {footer && <CardFooter>{footer}</CardFooter>}
  </Card>
);

/**
 * The standard card includes a header with title and description,
 * content, and a footer with actions.
 */
export const Standard: StoryObj<CardTemplateProps> = {
  args: {
    title: 'Create project',
    description: 'Deploy your new project in one-click.',
    content: <p>Your project configuration will be created automatically.</p>,
    footer: (
      <div className="flex justify-between w-full">
        <Button variant="ghost">Cancel</Button>
        <Button>Deploy</Button>
      </div>
    ),
  },
  render: CardTemplate,
};

/**
 * A card displaying notification items with a call-to-action footer.
 */
export const Notifications: StoryObj<CardTemplateProps> = {
  args: {
    title: 'Notifications',
    description: 'You have 3 unread messages.',
    content: (
      <div className="grid gap-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Your call has been confirmed.
            </p>
            <p className="text-sm text-muted-foreground">1 hour ago</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              You have a new message!
            </p>
            <p className="text-sm text-muted-foreground">1 hour ago</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Your subscription is expiring soon!
            </p>
            <p className="text-sm text-muted-foreground">2 hours ago</p>
          </div>
        </div>
      </div>
    ),
    footer: <Button className="w-full">Mark all as read</Button>,
  },
  render: CardTemplate,
};

/**
 * A simple card with only content and no header or footer.
 */
export const Simple: StoryObj<CardTemplateProps> = {
  args: {
    content: <p>A simple card with only content.</p>,
    className: 'pt-6',
  },
  render: CardTemplate,
};

/**
 * A card with only a header, useful for simple information displays.
 */
export const HeaderOnly: StoryObj<CardTemplateProps> = {
  args: {
    title: 'Team Members',
    description: 'Manage your team membership.',
  },
  render: CardTemplate,
}; 