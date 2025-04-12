import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/ui/select';

/**
 * Select components allow users to select a value from a list of options.
 */
const meta = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A select component for choosing an option from a list of values.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

// Define interface for our template props
interface SelectTemplateProps {
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  items?: { value: string; label: string }[];
  triggerSize?: 'sm' | 'default';
  scrollable?: boolean;
}

// Create a template for the Select component
const SelectTemplate: StoryFn<SelectTemplateProps> = ({
  placeholder = 'Select an option',
  disabled = false,
  label,
  items = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
  ],
  triggerSize,
  scrollable = false,
}) => (
  <Select disabled={disabled}>
    <SelectTrigger className="w-[180px]" size={triggerSize}>
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent className={scrollable ? "h-[200px]" : ""}>
      <SelectGroup>
        {label && <SelectLabel>{label}</SelectLabel>}
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);

/**
 * The default select with a list of options
 */
export const Default: StoryObj<SelectTemplateProps> = {
  render: SelectTemplate,
  args: {
    placeholder: 'Select a fruit',
  },
};

/**
 * Select with a label for the option group
 */
export const WithLabel: StoryObj<SelectTemplateProps> = {
  render: SelectTemplate,
  args: {
    placeholder: 'Select a fruit',
    label: 'Fruits',
  },
};

/**
 * Disabled select that cannot be interacted with
 */
export const Disabled: StoryObj<SelectTemplateProps> = {
  render: SelectTemplate,
  args: {
    placeholder: 'Select a fruit',
    disabled: true,
  },
};

/**
 * Small size variant of the select component
 */
export const Small: StoryObj<SelectTemplateProps> = {
  render: SelectTemplate,
  args: {
    placeholder: 'Select a fruit',
    triggerSize: 'sm',
  },
};

/**
 * For when you have many options, use the scrollable variant with ScrollArea component.
 */
export const Scrollable: StoryObj<SelectTemplateProps> = {
  render: SelectTemplate,
  args: {
    placeholder: 'Select a language',
    label: 'Languages',
    scrollable: true,
    items: [
      { value: 'en', label: 'English' },
      { value: 'fr', label: 'French' },
      { value: 'de', label: 'German' },
      { value: 'es', label: 'Spanish' },
      { value: 'pt', label: 'Portuguese' },
      { value: 'ru', label: 'Russian' },
      { value: 'ja', label: 'Japanese' },
      { value: 'ko', label: 'Korean' },
      { value: 'zh', label: 'Chinese' },
    ],
  },
}; 