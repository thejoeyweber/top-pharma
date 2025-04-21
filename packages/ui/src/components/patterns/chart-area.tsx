"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@workspace/hooks"
import { cn } from "@workspace/ui/lib/utils"
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

export interface TimeRangeOption {
  /**
   * Display label for the option
   */
  label: string;
  
  /**
   * Value identifier for the option
   */
  value: string;
  
  /**
   * Number of days to filter data
   */
  days: number;
}

export interface DataSeries {
  /**
   * Key in the data object for this series
   */
  key: string;
  
  /**
   * Display label for the series
   */
  label: string;
  
  /**
   * CSS color for the series
   */
  color?: string;
}

export interface ChartAreaProps {
  /**
   * Chart title
   */
  title?: string;
  
  /**
   * Chart description
   */
  description?: string;

  /**
   * The data to display in the chart
   */
  data: Array<Record<string, string | number>>;
  
  /**
   * The key in the data object that contains the X axis value (usually a date)
   */
  xAxisKey: string;
  
  /**
   * Configuration for data series to display
   */
  series: DataSeries[];
  
  /**
   * Available time range options for filtering
   */
  timeRangeOptions?: TimeRangeOption[];
  
  /**
   * Default selected time range
   */
  defaultTimeRange?: string;
  
  /**
   * Callback when time range changes
   */
  onTimeRangeChange?: (range: string) => void;
  
  /**
   * Custom class name
   */
  className?: string;
  
  /**
   * Key in the data used for filtering by date
   */
  dateKey?: string;
}

export function ChartArea({
  title = "Chart",
  description,
  data,
  xAxisKey,
  series,
  timeRangeOptions = [
    { label: "Last 7 days", value: "7d", days: 7 },
    { label: "Last 30 days", value: "30d", days: 30 },
    { label: "Last 3 months", value: "90d", days: 90 }
  ],
  defaultTimeRange = "90d",
  onTimeRangeChange,
  className,
  dateKey = "date"
}: ChartAreaProps) {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState(
    isMobile && defaultTimeRange === "90d" ? "7d" : defaultTimeRange
  )

  // Get the selected time range option
  const selectedTimeOption = React.useMemo(() => 
    timeRangeOptions.find(option => option.value === timeRange) || timeRangeOptions[0],
    [timeRange, timeRangeOptions]
  )

  // Filter data based on time range
  const filteredData = React.useMemo(() => {
    if (!data?.length) return []
    
    // If no date filtering needed, return all data
    if (!dateKey || !selectedTimeOption) return data
    
    const now = new Date()
    const daysToSubtract = selectedTimeOption.days
    const startDate = new Date(now)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    
    return data.filter(item => {
      const itemDate = new Date(item[dateKey])
      return itemDate >= startDate && itemDate <= now
    })
  }, [data, dateKey, selectedTimeOption])

  // Handle time range change
  const handleTimeRangeChange = (value: string) => {
    if (!value) return
    setTimeRange(value)
    onTimeRangeChange?.(value)
  }

  // Generate chart config object
  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {}
    series.forEach(s => {
      config[s.key] = {
        label: s.label,
        color: s.color || "var(--primary)"
      }
    })
    return config
  }, [series])

  return (
    <Card className={cn("@container/card", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && (
          <CardDescription>
            <span className="hidden @[540px]/card:block">
              {description}
            </span>
            <span className="@[540px]/card:hidden">
              {description}
            </span>
          </CardDescription>
        )}
        {timeRangeOptions && (
          <CardAction>
            <ToggleGroup
              type="single"
              value={timeRange}
              onValueChange={handleTimeRangeChange}
              variant="outline"
              className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
            >
              {timeRangeOptions.map(option => (
                <ToggleGroupItem key={option.value} value={option.value}>
                  {option.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <Select value={timeRange} onValueChange={handleTimeRangeChange}>
              <SelectTrigger
                className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
                size="sm"
                aria-label="Select time range"
              >
                <SelectValue placeholder={timeRangeOptions[0].label} />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {timeRangeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value} className="rounded-lg">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardAction>
        )}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart data={filteredData} height={300}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey={xAxisKey}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            {series.map(({ key, color = "var(--primary)" }) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={color}
                fill={color}
                fillOpacity={0.2}
              />
            ))}
            <ChartTooltip content={<ChartTooltipContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
} 