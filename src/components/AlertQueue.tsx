import { useState, useMemo } from 'react';
import { mockAlerts, type Alert } from '../lib/mockData';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Search, Filter, Download, RefreshCw, User, AlertTriangle, Clock, Info } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface AlertQueueProps {
  onAlertClick: (alertId: string, entityId: string) => void;
}

export function AlertQueue({ onAlertClick }: AlertQueueProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [selectedAlerts, setSelectedAlerts] = useState<Set<string>>(new Set());
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(new Set([
    'alertId', 'issueDate', 'alertDate', 'alertScore', 'subjectEntity', 'entityType',
    'priorAlerts', 'triggeredRules', 'counterparty', 'status', 'alertAge', 
    'owner', 'caseId', 'businessUnit', 'region'
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
        <Card className="kpi-card">
          <CardHeader className="pb-3 card-header">
            <CardTitle className="text-sm text-slate-500">Total Alerts</CardTitle>
          </CardHeader>
          <CardContent className="card-content">
            <div className="text-2xl font-semibold text-slate-900 kpi-value">{stats.total}</div>
          </CardContent>
        </Card>
        <Card className="kpi-card">
          <CardHeader className="pb-3 card-header">
            <CardTitle className="text-sm text-slate-500">Pending Review</CardTitle>
          </CardHeader>
          <CardContent className="card-content">
            <div className="text-2xl font-semibold text-slate-900 kpi-value">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card className="kpi-card">
          <CardHeader className="pb-3 card-header">
            <CardTitle className="text-sm text-slate-500">In Review</CardTitle>
          </CardHeader>
          <CardContent className="card-content">
            <div className="text-2xl font-semibold text-slate-900 kpi-value">{stats.inReview}</div>
          </CardContent>
        </Card>
        <Card className="kpi-card">
          <CardHeader className="pb-3 card-header">
            <CardTitle className="text-sm text-slate-500 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Aged
            </CardTitle>
          </CardHeader>
          <CardContent className="card-content">
            <div className="text-2xl font-semibold text-slate-900 kpi-value">{stats.aged}</div>
          </CardContent>
        </Card>
        <Card className="kpi-card">
          <CardHeader className="pb-3 card-header">
            <CardTitle className="text-sm text-slate-500">High Priority</CardTitle>
          </CardHeader>
          <CardContent className="card-content">
            <div className="text-2xl font-semibold text-slate-900 kpi-value">{stats.highPriority}</div>
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
                <DropdownMenuCheckboxItem checked={visibleColumns.has('alertDate')} onCheckedChange={() => toggleColumn('alertDate')}>
                  Alert Date
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={visibleColumns.has('alertScore')} onCheckedChange={() => toggleColumn('alertScore')}>
                  Alert Score
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={visibleColumns.has('subjectEntity')} onCheckedChange={() => toggleColumn('subjectEntity')}>
                  Subject Entity
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={visibleColumns.has('entityType')} onCheckedChange={() => toggleColumn('entityType')}>
                  Entity Type
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={visibleColumns.has('priorAlerts')} onCheckedChange={() => toggleColumn('priorAlerts')}>
                  # Prior Alerts
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={visibleColumns.has('triggeredRules')} onCheckedChange={() => toggleColumn('triggeredRules')}>
                  Triggered Rules
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={visibleColumns.has('counterparty')} onCheckedChange={() => toggleColumn('counterparty')}>
                  Counterparty
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={visibleColumns.has('status')} onCheckedChange={() => toggleColumn('status')}>
                  Alert Status
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={visibleColumns.has('alertAge')} onCheckedChange={() => toggleColumn('alertAge')}>
                  Alert Age
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={visibleColumns.has('owner')} onCheckedChange={() => toggleColumn('owner')}>
                  Owner
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={visibleColumns.has('caseId')} onCheckedChange={() => toggleColumn('caseId')}>
                  Case
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={visibleColumns.has('businessUnit')} onCheckedChange={() => toggleColumn('businessUnit')}>
                  Business Unit
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={visibleColumns.has('region')} onCheckedChange={() => toggleColumn('region')}>
                  Region
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
          <div className="flex items-center gap-2 mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <p className="text-sm text-blue-900">
              Select multiple alerts below if you wish to bulk assign, close or create cases
            </p>
          </div>
          <div className="rounded-md border">
            <TooltipProvider>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox />
                    </TableHead>
                    {visibleColumns.has('alertId') && (
                      <TableHead>
                        <Tooltip>
                          <TooltipTrigger className="cursor-help">Alert ID</TooltipTrigger>
                          <TooltipContent>
                            <p>Unique ID for alert</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableHead>
                    )}
                    {visibleColumns.has('issueDate') && (
                      <TableHead>
                        <Tooltip>
                          <TooltipTrigger className="cursor-help">Issue Date</TooltipTrigger>
                          <TooltipContent>
                            <p>Date of first suspicious event</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableHead>
                    )}
                    {visibleColumns.has('alertDate') && (
                      <TableHead>
                        <Tooltip>
                          <TooltipTrigger className="cursor-help">Alert Date</TooltipTrigger>
                          <TooltipContent>
                            <p>Date alert was generated</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableHead>
                    )}
                    {visibleColumns.has('alertScore') && (
                      <TableHead>
                        <Tooltip>
                          <TooltipTrigger className="cursor-help">Alert Score</TooltipTrigger>
                          <TooltipContent>
                            <p>Risk score of alert</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableHead>
                    )}
                    {visibleColumns.has('subjectEntity') && (
                      <TableHead>
                        <Tooltip>
                          <TooltipTrigger className="cursor-help">Subject Entity</TooltipTrigger>
                          <TooltipContent>
                            <p>What entity the alert has been raised on</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableHead>
                    )}
                    {visibleColumns.has('entityType') && (
                      <TableHead>
                        <Tooltip>
                          <TooltipTrigger className="cursor-help">Entity Type</TooltipTrigger>
                          <TooltipContent>
                            <p>Business or Individual</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableHead>
                    )}
                    {visibleColumns.has('priorAlerts') && (
                      <TableHead>
                        <Tooltip>
                          <TooltipTrigger className="cursor-help"># Prior Alerts</TooltipTrigger>
                          <TooltipContent>
                            <p>How many prior alerts have been raised on the entity</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableHead>
                    )}
                    {visibleColumns.has('triggeredRules') && (
                      <TableHead>
                        <Tooltip>
                          <TooltipTrigger className="cursor-help">Triggered Rules</TooltipTrigger>
                          <TooltipContent>
                            <p>How many rules triggered for the alert</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableHead>
                    )}
                    {visibleColumns.has('counterparty') && (
                      <TableHead>
                        <Tooltip>
                          <TooltipTrigger className="cursor-help">Counterparty</TooltipTrigger>
                          <TooltipContent>
                            <p>Who is the counterparty in the suspicious activity</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableHead>
                    )}
                    {visibleColumns.has('status') && (
                      <TableHead>
                        <Tooltip>
                          <TooltipTrigger className="cursor-help">Alert Status</TooltipTrigger>
                          <TooltipContent>
                            <p>Pending Review, In Review, Closed No Issue, Escalated Issue - Report pending, Filed & Complete</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableHead>
                    )}
                    {visibleColumns.has('alertAge') && (
                      <TableHead>
                        <Tooltip>
                          <TooltipTrigger className="cursor-help">Alert Age</TooltipTrigger>
                          <TooltipContent>
                            <p>If an alert goes over a predefined age and becomes an aged alert, identify with an exclamation mark</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableHead>
                    )}
                    {visibleColumns.has('owner') && (
                      <TableHead>
                        <Tooltip>
                          <TooltipTrigger className="cursor-help">Owner</TooltipTrigger>
                          <TooltipContent>
                            <p>Who owns the case or not assigned</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableHead>
                    )}
                    {visibleColumns.has('caseId') && (
                      <TableHead>
                        <Tooltip>
                          <TooltipTrigger className="cursor-help">Case</TooltipTrigger>
                          <TooltipContent>
                            <p>Identify if the alert has progressed to a case, including a case number</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableHead>
                    )}
                    {visibleColumns.has('businessUnit') && (
                      <TableHead>
                        <Tooltip>
                          <TooltipTrigger className="cursor-help">Business Unit</TooltipTrigger>
                          <TooltipContent>
                            <p>Corporate or Retail</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableHead>
                    )}
                    {visibleColumns.has('region') && (
                      <TableHead>
                        <Tooltip>
                          <TooltipTrigger className="cursor-help">Region</TooltipTrigger>
                          <TooltipContent>
                            <p>What region is this alert assigned to e.g. UK, IRL, US, Cayman</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableHead>
                    )}
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
                    {visibleColumns.has('alertDate') && (
                      <TableCell className="text-slate-600 text-sm">
                        {new Date(alert.alertDate).toLocaleDateString()}
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
                        <div className="text-slate-900">{alert.subjectEntity}</div>
                      </TableCell>
                    )}
                    {visibleColumns.has('entityType') && (
                      <TableCell>
                        <Badge variant="outline">{alert.entityType}</Badge>
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
                        <Badge variant="secondary">{alert.triggeredRules.length}</Badge>
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
                          {alert.aged && <AlertTriangle className="w-4 h-4 text-amber-500" />}
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
                    {visibleColumns.has('caseId') && (
                      <TableCell className="text-slate-600 text-sm">
                        {alert.caseId || <span className="text-slate-400">—</span>}
                      </TableCell>
                    )}
                    {visibleColumns.has('businessUnit') && (
                      <TableCell className="text-slate-600 text-sm">{alert.businessUnit}</TableCell>
                    )}
                    {visibleColumns.has('region') && (
                      <TableCell className="text-slate-600 text-sm">{alert.region}</TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </TooltipProvider>
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
