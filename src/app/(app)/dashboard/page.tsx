"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { Activity, Gift, Users, DollarSign, CreditCard } from 'lucide-react';
import { Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart as RechartsLineChart } from 'recharts';

const kpiData = [
  {
    title: 'Total Activations',
    value: '12,450',
    change: '+12.5%',
    icon: Gift,
  },
  {
    title: 'Total Redemptions',
    value: '8,970',
    change: '+9.2%',
    icon: DollarSign,
  },
  {
    title: 'Active Cards',
    value: '3,480',
    change: '-1.8%',
    icon: CreditCard,
  },
  {
    title: 'Total Balance',
    value: '$1,230,456',
    change: '+20.1%',
    icon: Activity,
  },
];

const usageData = [
    { month: 'Jan', activations: 4000, redemptions: 2400 },
    { month: 'Feb', activations: 3000, redemptions: 1398 },
    { month: 'Mar', activations: 2000, redemptions: 9800 },
    { month: 'Apr', activations: 2780, redemptions: 3908 },
    { month: 'May', activations: 1890, redemptions: 4800 },
    { month: 'Jun', activations: 2390, redemptions: 3800 },
    { month: 'Jul', activations: 3490, redemptions: 4300 },
];

const chartConfig = {
  activations: {
    label: "Activations",
    color: "hsl(var(--chart-2))",
  },
  redemptions: {
    label: "Redemptions",
    color: "hsl(var(--primary))",
  },
};


const recentActivities = [
  {
    id: 'TXN-001',
    card: '**** 1234',
    type: 'REDEMPTION',
    amount: '$50.00',
    status: 'Success',
    timestamp: '2 mins ago',
  },
  {
    id: 'TXN-002',
    card: '**** 5678',
    type: 'ACTIVATION',
    amount: '$200.00',
    status: 'Success',
    timestamp: '5 mins ago',
  },
  {
    id: 'TXN-003',
    card: '**** 9012',
    type: 'ADJUSTMENT',
    amount: '$10.00',
    status: 'Success',
    timestamp: '10 mins ago',
  },
    {
    id: 'TXN-004',
    card: '**** 3456',
    type: 'REDEMPTION',
    amount: '$25.50',
    status: 'Failed',
    timestamp: '12 mins ago',
  },
  {
    id: 'TXN-005',
    card: '**** 7890',
    type: 'ACTIVATION',
    amount: '$100.00',
    status: 'Success',
    timestamp: '15 mins ago',
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className={`text-xs ${kpi.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {kpi.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Usage Trends</CardTitle>
            <CardDescription>Monthly activations vs. redemptions</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer>
                  <RechartsLineChart data={usageData}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Line dataKey="activations" type="monotone" stroke="var(--color-activations)" strokeWidth={2} dot={false} />
                    <Line dataKey="redemptions" type="monotone" stroke="var(--color-redemptions)" strokeWidth={2} dot={false} />
                  </RechartsLineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Real-Time Monitoring</CardTitle>
            <CardDescription>Live feed of gift card transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction</TableHead>
                  <TableHead>Card</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-medium">{activity.id}</TableCell>
                    <TableCell>{activity.card}</TableCell>
                    <TableCell>
                      <Badge variant={activity.type === 'ACTIVATION' ? 'default' : activity.type === 'REDEMPTION' ? 'secondary' : 'outline'}>
                        {activity.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{activity.amount}</TableCell>
                    <TableCell>
                      <Badge variant={activity.status === 'Success' ? 'secondary' : 'destructive'} className={activity.status === 'Success' ? 'bg-green-500/20 text-green-400' : ''}>
                        {activity.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{activity.timestamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
