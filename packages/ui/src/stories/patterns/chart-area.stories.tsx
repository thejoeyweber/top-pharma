import { Meta, StoryObj } from '@storybook/react';

import { ChartArea } from '@workspace/ui/components/patterns/chart-area';

// Sample data for the chart
const sampleData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
];

const meta = {
  title: 'Patterns/ChartArea',
  component: ChartArea,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'An interactive area chart component for visualizing time-series data.',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    data: { control: 'object' },
    xAxisKey: { control: 'text' },
    series: { control: 'object' },
    timeRangeOptions: { control: 'object' },
    defaultTimeRange: { control: 'select', options: ['7d', '30d', '90d'] },
    onTimeRangeChange: { action: 'timeRangeChanged' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ChartArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Total Visitors',
    description: 'Total for the last 3 months',
    data: sampleData,
    xAxisKey: 'date',
    series: [
      { key: 'desktop', label: 'Desktop', color: 'var(--primary)' },
      { key: 'mobile', label: 'Mobile', color: 'var(--secondary)' },
    ],
    timeRangeOptions: [
      { label: 'Last 7 days', value: '7d', days: 7 },
      { label: 'Last 30 days', value: '30d', days: 30 },
      { label: 'Last 3 months', value: '90d', days: 90 },
    ],
    defaultTimeRange: '30d',
  },
};

// Generate revenue data
const revenueData = sampleData.map(item => ({
  date: item.date,
  revenue: Math.floor(Math.random() * 10000) + 5000,
}));

export const SingleSeries: Story = {
  args: {
    title: 'Revenue',
    description: 'Revenue over time',
    data: revenueData,
    xAxisKey: 'date',
    series: [
      { key: 'revenue', label: 'Revenue', color: 'var(--primary)' }
    ],
    timeRangeOptions: [
      { label: '7 days', value: '7d', days: 7 },
      { label: '14 days', value: '14d', days: 14 },
    ],
    defaultTimeRange: '14d',
  },
}; 