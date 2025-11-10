import { useState, useMemo } from 'react';
import { mockAlerts, type Alert } from '../lib/mockData';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Search, Filter, Download, RefreshCw, User, AlertTriangle, Clock } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

interface AlertQueueProps {
  onAlertClick: (alertId: string, entityId: string) => void;
}

export function AlertQueue({ onAlertClick }: AlertQueueProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [selectedAlerts, setSelectedAlerts] = useState<Set<string>>(new Set());
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(new Set([
    'alertId', 'issueDate', 'alertScore', 'subjectEntity', 'triggeredRules', 
    'status', 'alertAge', 'owner', 'priority', 'slaDue'
  ]));

  const filteredAlerts = useMemo(() => {
    return mockAlerts.filter(alert => {
      const matchesSearch = alert.subjectEntity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           alert.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           alert.counterparty.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || alert.priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [searchTerm, statusFilter, priorityFilter]);

  const toggleColumn = (column: string) => {
    const newColumns = new Set(visibleColumns);
    if (newColumns.has(column)) {
      newColumns.delete(column);
    } else {
      newColumns.add(column);
    }
    setVisibleColumns(newColumns);
  };

  const toggleAlertSelection = (alertId: string) => {
    const newSelection = new Set(selectedAlerts);
    if (newSelection.has(alertId)) {
      newSelection.delete(alertId);
    } else {
      newSelection.add(alertId);
    }
    setSelectedAlerts(newSelection);
  };

  const getStatusBadge = (status: Alert['status']) => {
    const variants: Record<Alert['status'], { variant: 'default' | 'secondary' | 'destructive' | 'outline', className?: string }> = {
      'Pending review': { variant: 'outline' },
      'In review': { variant: 'default', className: 'bg-blue-500' },
      'Escalated': { variant: 'destructive' },
      'Closed no issue': { variant: 'secondary' },
      'Filed & complete': { variant: 'default', className: 'bg-green-600' }
    };
    return <Badge variant={variants[status].variant} className={variants[status].className}>{status}</Badge>;
  };

  const getPriorityBadge = (priority: Alert['priority']) => {
    const variants: Record<Alert['priority'], 'destructive' | 'default' | 'secondary'> = {
      'High': 'destructive',
      'Medium': 'default',
      'Low': 'secondary'
    };
    return <Badge variant={variants[priority]}>{priority}</Badge>;
  };

  const stats = useMemo(() => {
    const total = mockAlerts.length;
    const pending = mockAlerts.filter(a => a.status === 'Pending review').length;
    const inReview = mockAlerts.filter(a => a.status === 'In review').length;
    const aged = mockAlerts.filter(a => a.aged).length;
    const highPriority = mockAlerts.filter(a => a.priority === 'High').length;
    
    return { total, pending, inReview, aged, highPriority };
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">Alert Queue</h1>
          <p className="text-slate-500">Detection, triage and assignment</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-500">Total Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-500">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-500">In Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">{stats.inReview}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-500 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Aged
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">{stats.aged}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-500">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">{stats.highPriority}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search by entity, alert ID, or counterparty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Pending review">Pending review</SelectItem>
                <SelectItem value="In review">In review</SelectItem>
                <SelectItem value="Escalated">Escalated</SelectItem>
                <SelectItem value="Closed no issue">Closed no issue</SelectItem>
                <SelectItem value="Filed & complete">Filed & complete</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked={visibleColumns.has('alertId')} onCheckedChange={() => toggleColumn('alertId')}>
                  Alert ID
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={visibleColumns.has('issueDate')} onCheckedChange={() => toggleColumn('issueDate')}>
                  Issue Date
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={visibleColumns.has('alertScore')} onCheckedChange={() => toggleColumn('alertScore')}>
                  Alert Score
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={visibleColumns.has('subjectEntity')} onCheckedChange={() => toggleColumn('subjectEntity')}>
                  Subject Entity
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={visibleColumns.has('priorAlerts')} onCheckedChange={() => toggleColumn('priorAlerts')}>
                  Prior Alerts
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={visibleColumns.has('triggeredRules')} onCheckedChange={() => toggleColumn('triggeredRules')}>
                  Triggered Rules
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={visibleColumns.has('counterparty')} onCheckedChange={() => toggleColumn('counterparty')}>
                  Counterparty
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={visibleColumns.has('status')} onCheckedChange={() => toggleColumn('status')}>
                  Status
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={visibleColumns.has('alertAge')} onCheckedChange={() => toggleColumn('alertAge')}>
                  Alert Age
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={visibleColumns.has('owner')} onCheckedChange={() => toggleColumn('owner')}>
                  Owner
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={visibleColumns.has('priority')} onCheckedChange={() => toggleColumn('priority')}>
                  Priority
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={visibleColumns.has('slaDue')} onCheckedChange={() => toggleColumn('slaDue')}>
                  SLA Due
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={visibleColumns.has('rfiStatus')} onCheckedChange={() => toggleColumn('rfiStatus')}>
                  RFI Status
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={visibleColumns.has('amount')} onCheckedChange={() => toggleColumn('amount')}>
                  Amount
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {selectedAlerts.size > 0 && (
            <div className="flex items-center gap-2 mt-4 p-3 bg-blue-50 rounded-md">
              <span className="text-sm text-blue-900">{selectedAlerts.size} alert(s) selected</span>
              <Button size="sm" variant="outline">
                <User className="w-4 h-4 mr-2" />
                Assign
              </Button>
              <Button size="sm" variant="outline">Bulk Close</Button>
              <Button size="sm" variant="outline">Create Case</Button>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox />
                  </TableHead>
                  {visibleColumns.has('alertId') && <TableHead>Alert ID</TableHead>}
                  {visibleColumns.has('issueDate') && <TableHead>Issue Date</TableHead>}
                  {visibleColumns.has('alertScore') && <TableHead>Score</TableHead>}
                  {visibleColumns.has('subjectEntity') && <TableHead>Subject Entity</TableHead>}
                  {visibleColumns.has('priorAlerts') && <TableHead>Prior</TableHead>}
                  {visibleColumns.has('triggeredRules') && <TableHead>Triggered Rules</TableHead>}
                  {visibleColumns.has('counterparty') && <TableHead>Counterparty</TableHead>}
                  {visibleColumns.has('status') && <TableHead>Status</TableHead>}
                  {visibleColumns.has('alertAge') && <TableHead>Age</TableHead>}
                  {visibleColumns.has('owner') && <TableHead>Owner</TableHead>}
                  {visibleColumns.has('priority') && <TableHead>Priority</TableHead>}
                  {visibleColumns.has('slaDue') && <TableHead>SLA Due</TableHead>}
                  {visibleColumns.has('rfiStatus') && <TableHead>RFI</TableHead>}
                  {visibleColumns.has('amount') && <TableHead className="text-right">Amount</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlerts.map((alert) => (
                  <TableRow 
                    key={alert.id}
                    className="cursor-pointer hover:bg-slate-50"
                    onClick={() => onAlertClick(alert.id, alert.entityId)}
                  >
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox 
                        checked={selectedAlerts.has(alert.id)}
                        onCheckedChange={() => toggleAlertSelection(alert.id)}
                      />
                    </TableCell>
                    {visibleColumns.has('alertId') && (
                      <TableCell className="text-blue-600">{alert.id}</TableCell>
                    )}
                    {visibleColumns.has('issueDate') && (
                      <TableCell className="text-slate-600 text-sm">
                        {new Date(alert.issueDate).toLocaleDateString()}
                      </TableCell>
                    )}
                    {visibleColumns.has('alertScore') && (
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`w-12 h-6 rounded-full flex items-center justify-center text-xs ${
                            alert.alertScore >= 80 ? 'bg-red-100 text-red-700' :
                            alert.alertScore >= 60 ? 'bg-amber-100 text-amber-700' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {alert.alertScore}
                          </div>
                        </div>
                      </TableCell>
                    )}
                    {visibleColumns.has('subjectEntity') && (
                      <TableCell>
                        <div>
                          <div className="text-slate-900">{alert.subjectEntity}</div>
                          <div className="text-xs text-slate-500">{alert.entityType}</div>
                        </div>
                      </TableCell>
                    )}
                    {visibleColumns.has('priorAlerts') && (
                      <TableCell>
                        {alert.priorAlerts > 0 ? (
                          <Badge variant="outline">{alert.priorAlerts}</Badge>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </TableCell>
                    )}
                    {visibleColumns.has('triggeredRules') && (
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {alert.triggeredRules.slice(0, 2).map((rule, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {rule}
                            </Badge>
                          ))}
                          {alert.triggeredRules.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{alert.triggeredRules.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    )}
                    {visibleColumns.has('counterparty') && (
                      <TableCell className="text-slate-600 text-sm">{alert.counterparty}</TableCell>
                    )}
                    {visibleColumns.has('status') && (
                      <TableCell>{getStatusBadge(alert.status)}</TableCell>
                    )}
                    {visibleColumns.has('alertAge') && (
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {alert.aged && <Clock className="w-4 h-4 text-amber-500" />}
                          <span className={alert.aged ? 'text-amber-700' : ''}>
                            {alert.alertAge}d
                          </span>
                        </div>
                      </TableCell>
                    )}
                    {visibleColumns.has('owner') && (
                      <TableCell className="text-slate-600 text-sm">
                        {alert.owner || <span className="text-slate-400">Unassigned</span>}
                      </TableCell>
                    )}
                    {visibleColumns.has('priority') && (
                      <TableCell>{getPriorityBadge(alert.priority)}</TableCell>
                    )}
                    {visibleColumns.has('slaDue') && (
                      <TableCell>
                        <div className="text-sm text-slate-600">
                          {new Date(alert.slaDue).toLocaleDateString()}
                          {alert.slaRisk && (
                            <Badge variant="destructive" className="ml-2 text-xs">At Risk</Badge>
                          )}
                        </div>
                      </TableCell>
                    )}
                    {visibleColumns.has('rfiStatus') && (
                      <TableCell>
                        {alert.rfiStatus !== 'None' ? (
                          <Badge variant="outline">{alert.rfiStatus}</Badge>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </TableCell>
                    )}
                    {visibleColumns.has('amount') && alert.amount && (
                      <TableCell className="text-right">
                        <div className="text-slate-900">
                          {alert.currency} {alert.amount.toLocaleString()}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
            <div>Showing {filteredAlerts.length} of {mockAlerts.length} alerts</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
