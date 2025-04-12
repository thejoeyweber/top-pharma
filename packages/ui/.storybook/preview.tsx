import '../src/styles/globals.css';
import type { Preview, Decorator } from '@storybook/react';
import React from 'react';

// Apply consistent theme and styling
const withThemeDecorator: Decorator = (Story) => {
  return (
    <div className="p-4 bg-background min-h-[100px] flex items-center justify-center">
      <Story />
    </div>
  );
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1e293b' },
      ],
    },
    docs: {
      toc: true,
      source: {
        state: 'open',
      },
    },
  },
  decorators: [withThemeDecorator],
};

export default preview; 