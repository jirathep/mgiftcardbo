"use client";

import * as React from 'react';
import { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { DateRange } from 'react-day-picker';
import { format, addDays } from 'date-fns';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const reportData = [
  { name: 'Week 1', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Week 2', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Week 3', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Week 4', total: Math.floor(Math.random() * 5000) + 1000 },
];

const chartConfig = {
  total: {
    label: 'Total Value',
    color: 'hsl(var(--primary))',
  },
};

export default function ReportsPage() {
  const [reportType, setReportType] = React.useState<string | null>(null);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [showReport, setShowReport] = React.useState(false);
  const [chartData, setChartData] = React.useState(reportData);

  const handleGenerateReport = () => {
    if (reportType && date) {
      // Regenerate data when a new report is generated
      setChartData(
        reportData.map((d) => ({
          ...d,
          total: Math.floor(Math.random() * 5000) + 1000,
        }))
      );
      setShowReport(true);
    }
  };
  
  // Avoid hydration mismatch by moving random data generation to useEffect
  useEffect(() => {
    setChartData(
      reportData.map((d) => ({
        ...d,
        total: Math.floor(Math.random() * 5000) + 1000,
      }))
    );
  }, []);


  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Automated Reports</h1>

      <Card>
        <CardHeader>
          <CardTitle>Generate a New Report</CardTitle>
          <CardDescription>
            Select a report type and date range to generate insights.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="grid gap-2 flex-1">
            <label className="text-sm font-medium">Report Type</label>
            <Select onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Select a report..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="performance">Performance Summary</SelectItem>
                <SelectItem value="demographics">Customer Demographics</SelectItem>
                <SelectItem value="product_popularity">Popular Products</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Date Range</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={'outline'}
                  className={cn(
                    'w-full justify-start text-left font-normal md:w-[300px]',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, 'LLL dd, y')} -{' '}
                        {format(date.to, 'LLL dd, y')}
                      </>
                    ) : (
                      format(date.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button onClick={handleGenerateReport} disabled={!reportType || !date}>
            Generate Report
          </Button>
        </CardContent>
      </Card>
      
      {showReport && (
        <Card className="animate-in fade-in-50">
          <CardHeader>
            <CardTitle>
              {reportType?.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Report
            </CardTitle>
            <CardDescription>
              {date?.from && date?.to ? `Report for ${format(date.from, 'LLL dd, y')} to ${format(date.to, 'LLL dd, y')}` : ''}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 lg:grid-cols-3">
             <div className="lg:col-span-2">
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer>
                    <RechartsBarChart data={chartData}>
                      <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent />}
                      />
                      <Bar
                        dataKey="total"
                        fill="var(--color-total)"
                        radius={4}
                      />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </ChartContainer>
             </div>
             <div className="flex flex-col gap-4 justify-center">
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Peak Usage Day</p>
                    <p className="text-xl font-semibold">Fridays</p>
                </div>
                 <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Most Popular Product</p>
                    <p className="text-xl font-semibold">2-for-1 Dinner</p>
                </div>
                 <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Top Customer Segment</p>
                    <p className="text-xl font-semibold">Urban Millennials</p>
                </div>
             </div>
          </CardContent>
        </Card>
      )}

    </div>
  );
}
