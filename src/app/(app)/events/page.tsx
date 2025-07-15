"use client";

import * as React from 'react';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Search } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ClientTimestamp } from '@/components/client-timestamp';

const eventLogs = [
    { id: 'EVT-001', user: 'admin@mgiftcard.com', type: 'ACTIVATION', timestamp: '2024-07-27T10:00:00Z', details: 'Card activated: ****-****-****-1234' },
    { id: 'EVT-002', user: 'user1@example.com', type: 'REDEMPTION', timestamp: '2024-07-27T10:05:12Z', details: 'Redeemed $25.50 from ****-****-****-5678' },
    { id: 'EVT-003', user: 'system', type: 'REPORT_GENERATED', timestamp: '2024-07-27T11:00:00Z', details: 'Monthly performance report generated' },
    { id: 'EVT-004', user: 'admin@mgiftcard.com', type: 'ADJUSTMENT', timestamp: '2024-07-27T12:30:45Z', details: 'Balance adjustment of +$10.00 on ****-****-****-1234' },
    { id: 'EVT-005', user: 'user2@example.com', type: 'LOGIN_SUCCESS', timestamp: '2024-07-28T09:00:00Z', details: 'User logged in successfully' },
    { id: 'EVT-006', user: 'user3@example.com', type: 'LOGIN_FAILED', timestamp: '2024-07-28T09:01:30Z', details: 'Failed login attempt' },
    { id: 'EVT-007', user: 'admin@mgiftcard.com', type: 'DEACTIVATION', timestamp: '2024-07-28T14:00:00Z', details: 'Card deactivated: ****-****-****-9012' },
];

export default function EventsPage() {
  const [date, setDate] = React.useState<Date | undefined>();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Event Logging</h1>

      <Card>
        <CardHeader>
          <CardTitle>Event History</CardTitle>
          <CardDescription>
            A detailed log of all system and user events.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Filter by user or details..." className="pl-10" />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full justify-start text-left font-normal md:w-[240px]',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Event Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="activation">Activation</SelectItem>
                <SelectItem value="redemption">Redemption</SelectItem>
                <SelectItem value="adjustment">Adjustment</SelectItem>
                <SelectItem value="report_generated">Report Generated</SelectItem>
                <SelectItem value="login_success">Login Success</SelectItem>
                <SelectItem value="login_failed">Login Failed</SelectItem>
              </SelectContent>
            </Select>
            <Button>Apply Filters</Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Event Type</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {eventLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono">{log.id}</TableCell>
                    <TableCell>{log.user}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{log.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <ClientTimestamp timestamp={log.timestamp} />
                    </TableCell>
                    <TableCell>{log.details}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
