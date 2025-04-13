import { Meta, StoryObj } from '@storybook/react';
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from '@tabler/icons-react';

import { AppSidebar } from '@workspace/ui/components/patterns/app-sidebar';
import { MenuItem, DocumentItem, UserInfo } from '@workspace/ui/components/patterns/app-sidebar';

const meta = {
  title: 'Patterns/AppSidebar',
  component: AppSidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A configurable application sidebar component with navigation sections.',
      },
    },
  },
  argTypes: {
    appName: { control: 'text' },
    logoUrl: { control: 'text' },
    user: { control: 'object' },
    mainNavItems: { control: 'object' },
    documentItems: { control: 'object' },
    secondaryNavItems: { control: 'object' },
    collapsible: { 
      control: 'select', 
      options: ['offcanvas', 'icon', 'none']
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AppSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const user: UserInfo = {
  name: "Jane Smith",
  email: "jane@example.com",
  avatar: "https://avatar.vercel.sh/jane-smith",
};

const mainNavItems: MenuItem[] = [
  {
    title: "Dashboard",
    url: "#",
    icon: IconDashboard,
  },
  {
    title: "Lifecycle",
    url: "#",
    icon: IconListDetails,
  },
  {
    title: "Analytics",
    url: "#",
    icon: IconChartBar,
  },
  {
    title: "Projects",
    url: "#",
    icon: IconFolder,
  },
  {
    title: "Team",
    url: "#",
    icon: IconUsers,
  },
];

const documentItems: DocumentItem[] = [
  {
    name: "Data Library",
    url: "#",
    icon: IconDatabase,
  },
  {
    name: "Reports",
    url: "#",
    icon: IconReport,
  },
  {
    name: "Word Assistant",
    url: "#",
    icon: IconFileWord,
  },
];

const secondaryNavItems: MenuItem[] = [
  {
    title: "Settings",
    url: "#",
    icon: IconSettings,
  },
  {
    title: "Get Help",
    url: "#",
    icon: IconHelp,
  },
  {
    title: "Search",
    url: "#",
    icon: IconSearch,
  },
];

export const Default: Story = {
  args: {
    appName: "TopPharma",
    logoUrl: "#",
    user,
    mainNavItems,
    documentItems,
    secondaryNavItems,
    collapsible: "offcanvas",
  },
};

export const NoDocuments: Story = {
  args: {
    appName: "TopPharma",
    logoUrl: "#",
    user,
    mainNavItems,
    documentItems: [],
    secondaryNavItems,
    collapsible: "offcanvas",
  },
};

export const IconCollapsible: Story = {
  args: {
    appName: "TopPharma",
    logoUrl: "#",
    user,
    mainNavItems,
    documentItems,
    secondaryNavItems,
    collapsible: "icon",
  },
}; 