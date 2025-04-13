"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@workspace/ui/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@workspace/ui/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/ui/toggle-group"

export const description = "An interactive area chart"

// Types for the component props
export interface TimeRangeOption {
  value: string;
  label: string;
}

export interface ChartDataPoint {
  date: string;
  [key: string]: any;
}

export interface ChartAreaInteractiveProps {
  /**
   * Title of the chart card
   */
  title?: string;
  
  /**
   * Description text for the chart
   */
  description?: string;
  
  /**
   * Array of data points to display in the chart
   */
  data: ChartDataPoint[];
  
  /**
   * Chart configuration for visual styling and labels
   */
  config: ChartConfig;
  
  /**
   * Available time range options
   */
  timeRangeOptions?: TimeRangeOption[];
  
  /**
   * Default selected time range
   */
  defaultTimeRange?: string;
  
  /**
   * Field in data to use for the x-axis
   */
  dateField?: string;
  
  /**
   * Function to filter data based on the selected time range
   */
  filterDataByTimeRange?: (data: ChartDataPoint[], timeRange: string) => ChartDataPoint[];
}

const defaultTimeRangeOptions = [
  { value: "90d", label: "Last 3 months" },
  { value: "30d", label: "Last 30 days" },
  { value: "7d", label: "Last 7 days" },
]

// Default filter function
const defaultFilterData = (data: ChartDataPoint[], timeRange: string): ChartDataPoint[] => {
  if (!data?.length) return [];
  
  const lastItem = data[data.length - 1];
  const referenceDate = lastItem?.date 
    ? new Date(lastItem.date) 
    : new Date();
  
  let daysToSubtract = 90;
  
  if (timeRange === "30d") {
    daysToSubtract = 30;
  } else if (timeRange === "7d") {
    daysToSubtract = 7;
  }
  
  const startDate = new Date(referenceDate);
  startDate.setDate(startDate.getDate() - daysToSubtract);
  
  return data.filter((item) => {
    const date = new Date(item.date);
    return date >= startDate;
  });
}

export function ChartAreaInteractive({
  title = "Chart",
  description,
  data,
  config,
  timeRangeOptions = defaultTimeRangeOptions,
  defaultTimeRange = "90d",
  dateField = "date",
  filterDataByTimeRange = defaultFilterData
}: ChartAreaInteractiveProps) {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState(defaultTimeRange)

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  if (!data?.length || !config) {
    return null;
  }

  const filteredData = filterDataByTimeRange(data, timeRange)

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && (
          <CardDescription>
            <span className="hidden @[540px]/card:block">
              {description}
            </span>
            <span className="@[540px]/card:hidden">
              {description.split(" ").slice(-2).join(" ")}
            </span>
          </CardDescription>
        )}
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            {timeRangeOptions.map((option) => (
              <ToggleGroupItem key={option.value} value={option.value}>
                {option.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a time range"
            >
              <SelectValue placeholder={timeRangeOptions[0]?.label} />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {timeRangeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="rounded-lg">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={config}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={dateField}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                // Format date for display
                const date = new Date(value)
                if (isNaN(date.getTime())) return value
                return new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  day: "numeric",
                }).format(date)
              }}
            />
            {/* Add chart areas for all keys except date */}
            {Object.keys(filteredData[0] || {})
              .filter(key => key !== dateField)
              .map((key) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={`var(--color-${key})`}
                  fill={`url(#fill${key.charAt(0).toUpperCase() + key.slice(1)})`}
                  strokeWidth={2}
                />
              ))}
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value: any) => `${value}`}
                  labelFormatter={(label: string) => {
                    const date = new Date(label)
                    if (isNaN(date.getTime())) return label
                    return new Intl.DateTimeFormat("en-US", {
                      month: "long",
                      day: "numeric",
                    }).format(date)
                  }}
                />
              }
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
} 