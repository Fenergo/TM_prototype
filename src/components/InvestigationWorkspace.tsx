import { useState, useMemo } from 'react';
import { mockAlerts, mockEntities, mockTransactions } from '../lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { AlertCircle, TrendingUp, Users, Wallet, FileText, Paperclip, Clock, Shield, Network, Calendar, ChevronDown } from 'lucide-react';
import { EntityGraph } from './EntityGraph';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from './ui/utils';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface InvestigationWorkspaceProps {
  alertId: string | null;
  entityId: string | null;
}

export function InvestigationWorkspace({ alertId, entityId }: InvestigationWorkspaceProps) {
  const [notes, setNotes] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [customerOnboardDate, setCustomerOnboardDate] = useState<Date>();
  const [lastRemediationType, setLastRemediationType] = useState('');
  const [investigationStatus, setInvestigationStatus] = useState('in-progress');

  const alert = useMemo(() => 
    alertId ? mockAlerts.find(a => a.id === alertId) : null, 
    [alertId]
  );

  const entity = useMemo(() => 
    entityId ? mockEntities[entityId] : null,
    [entityId]
  );

  const relatedTransactions = useMemo(() => {
    if (!entity) return [];
    return mockTransactions.filter(t => 
      t.fromEntity === entity.name || t.toEntity === entity.name
    );
  }, [entity]);

  if (!alert || !entity) {
    return (
      <div className="p-6 flex items-center justify-center h-full">
        <div className="text-center">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-slate-900 mb-2">No Alert Selected</h3>
          <p className="text-slate-500">Select an alert from the Alert Queue to begin investigation</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-slate-900">{alert.id}</h1>
            <Badge variant={alert.priority === 'High' ? 'destructive' : 'default'}>
              {alert.priority} Priority
            </Badge>
            {alert.aged && (
              <Badge variant="outline" className="border-amber-500 text-amber-700">
                <Clock className="w-3 h-3 mr-1" />
                Aged
              </Badge>
            )}
          </div>
          <p className="text-slate-500 mb-3">
            Investigating {entity.name} • {entity.type} • {entity.jurisdiction}
          </p>
          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium text-slate-700">Investigation Status:</Label>
            <Select value={investigationStatus} onValueChange={setInvestigationStatus}>
              <SelectTrigger className="w-[180px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="complete">Complete</SelectItem>
                <SelectItem value="alerted">Alerted</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Assign RFI</Button>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Add to Case
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>Move to Case</DropdownMenuItem>
              <DropdownMenuItem>Add Alert</DropdownMenuItem>
              <DropdownMenuItem>Rework Required</DropdownMenuItem>
              <DropdownMenuItem>Close - Not Suspicious</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>Close Alert</Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="kpi-card">
          <CardHeader className="pb-3 card-header">
            <CardTitle className="text-sm text-slate-500 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Alert Score
            </CardTitle>
          </CardHeader>
          <CardContent className="card-content">
            <div className="text-2xl font-semibold text-slate-900 kpi-value">{alert.alertScore}</div>
            <p className="text-xs text-slate-500 mt-1">ML-enhanced risk</p>
          </CardContent>
        </Card>
        <Card className="kpi-card">
          <CardHeader className="pb-3 card-header">
            <CardTitle className="text-sm text-slate-500 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Entity Risk Score
            </CardTitle>
          </CardHeader>
          <CardContent className="card-content">
            <div className="text-2xl font-semibold text-slate-900 kpi-value">{entity.riskScore}</div>
            <p className="text-xs text-slate-500 mt-1">
              {entity.pepStatus && 'PEP • '}
              {entity.kycStatus}
            </p>
          </CardContent>
        </Card>
        <Card className="kpi-card">
          <CardHeader className="pb-3 card-header">
            <CardTitle className="text-sm text-slate-500 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Prior Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="card-content">
            <div className="text-2xl font-semibold text-slate-900 kpi-value">{alert.priorAlerts}</div>
            <p className="text-xs text-slate-500 mt-1">Last 12 months</p>
          </CardContent>
        </Card>
        <Card className="kpi-card">
          <CardHeader className="pb-3 card-header">
            <CardTitle className="text-sm text-slate-500 flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              Total Alerted Value
            </CardTitle>
          </CardHeader>
          <CardContent className="card-content">
            <div className="text-2xl font-semibold text-slate-900 kpi-value">
              {entity.accounts[0]?.currency || 'USD'} {entity.accounts.reduce((sum, acc) => sum + acc.balance, 0).toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">{entity.accounts.length} accounts</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="graph">Entity Network</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="evidence">Evidence</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Alert Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-slate-500 mb-1">Issue Date</div>
                  <div className="text-slate-900">
                    {new Date(alert.issueDate).toLocaleString()}
                  </div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-slate-500 mb-2">Triggered Rules</div>
                  <div className="flex flex-wrap gap-2">
                    {alert.triggeredRules.map((rule, idx) => (
                      <Badge key={idx} variant="secondary">{rule}</Badge>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-slate-500 mb-2">Typology Tags</div>
                  <div className="flex flex-wrap gap-2">
                    {alert.typologyTags.map((tag, idx) => (
                      <Badge key={idx} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-slate-500 mb-1">Counterparty</div>
                  <div className="text-slate-900">{alert.counterparty}</div>
                </div>
                {alert.amount && (
                  <>
                    <Separator />
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Transaction Amount</div>
                      <div className="text-slate-900">
                        {alert.currency} {alert.amount.toLocaleString()}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Entity Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-slate-500 mb-1">Entity Name</div>
                  <div className="text-slate-900">{entity.name}</div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-slate-500 mb-1">Entity Type</div>
                  <div className="text-slate-900">{entity.type}</div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-slate-500 mb-1">Jurisdiction</div>
                  <div className="text-slate-900">{entity.jurisdiction}</div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-slate-500 mb-1">KYC Status</div>
                  <div className="text-slate-900">{entity.kycStatus}</div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-slate-500 mb-1">Customer Onboard Date</div>
                  <Input
                    type="date"
                    value={customerOnboardDate ? format(customerOnboardDate, 'yyyy-MM-dd') : ''}
                    onChange={(e) => setCustomerOnboardDate(e.target.value ? new Date(e.target.value) : undefined)}
                    className="mt-1"
                  />
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-slate-500 mb-1">Last Remediation Type</div>
                  <Select value={lastRemediationType} onValueChange={setLastRemediationType}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select remediation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low-to-medium">Low to Medium</SelectItem>
                      <SelectItem value="medium-to-high">Medium to High</SelectItem>
                      <SelectItem value="low-to-high">Low to High</SelectItem>
                      <SelectItem value="high-to-medium">High to Medium</SelectItem>
                      <SelectItem value="high-to-low">High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-slate-500 mb-2">Risk Flags</div>
                  <div className="flex flex-wrap gap-2">
                    {entity.pepStatus && (
                      <Badge variant="destructive">PEP</Badge>
                    )}
                    {entity.sanctionsHit && (
                      <Badge variant="destructive">Sanctions Hit</Badge>
                    )}
                    {entity.riskScore > 75 && (
                      <Badge variant="outline" className="border-amber-500 text-amber-700">
                        High Risk
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account ID</TableHead>
                    <TableHead>Account Type</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                    <TableHead>Currency</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entity.accounts.map((account) => (
                    <TableRow key={account.accountId}>
                      <TableCell className="text-blue-600">{account.accountId}</TableCell>
                      <TableCell>{account.accountType}</TableCell>
                      <TableCell className="text-right">
                        {account.balance.toLocaleString()}
                      </TableCell>
                      <TableCell>{account.currency}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="w-4 h-4" />
                Related Entities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {entity.relationships.map((rel, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="text-slate-900">{rel.entityName}</div>
                      <div className="text-sm text-slate-500">{rel.relationshipType}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-slate-500">
                        Strength: {(rel.strength * 100).toFixed(0)}%
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="graph">
          <Card>
            <CardHeader>
              <CardTitle>Entity Network Graph</CardTitle>
              <p className="text-sm text-slate-500">
                Interactive visualization of entity relationships, beneficial ownership, and transaction flows
              </p>
            </CardHeader>
            <CardContent>
              <EntityGraph entity={entity} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Related Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {relatedTransactions.map((txn) => (
                    <TableRow key={txn.id} className={txn.flagged ? 'bg-amber-50' : ''}>
                      <TableCell className="text-blue-600">{txn.id}</TableCell>
                      <TableCell className="text-sm">
                        {new Date(txn.date).toLocaleString()}
                      </TableCell>
                      <TableCell>{txn.type}</TableCell>
                      <TableCell className="text-sm">
                        <div>{txn.fromEntity}</div>
                        <div className="text-xs text-slate-500">{txn.fromAccount}</div>
                      </TableCell>
                      <TableCell className="text-sm">
                        <div>{txn.toEntity}</div>
                        <div className="text-xs text-slate-500">{txn.toAccount}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        {txn.currency} {txn.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{txn.status}</Badge>
                          {txn.flagged && (
                            <AlertCircle className="w-4 h-4 text-amber-500" />
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Activity Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {relatedTransactions.map((txn, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${txn.flagged ? 'bg-amber-500' : 'bg-blue-500'}`} />
                      {idx < relatedTransactions.length - 1 && (
                        <div className="w-0.5 h-16 bg-slate-200" />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="text-sm text-slate-500 mb-1">
                        {new Date(txn.date).toLocaleString()}
                      </div>
                      <div className="text-slate-900">{txn.type}</div>
                      <div className="text-sm text-slate-600 mt-1">
                        {txn.fromEntity} → {txn.toEntity}
                      </div>
                      <div className="mt-2">
                        {txn.currency} {txn.amount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evidence">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Investigation Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Add observations, hypotheses, and evidence..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[200px] mb-4"
                />
                <Button>Save Notes</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Paperclip className="w-4 h-4" />
                  Attachments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center">
                  <Paperclip className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-500 text-sm mb-4">
                    Drag and drop files here or click to browse
                  </p>
                  <Button variant="outline">Upload Files</Button>
                </div>
                <div className="mt-4 text-sm text-slate-500">
                  {alert.attachments} file(s) attached
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Historical Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-4">
                    <div className="text-sm">
                      <div className="flex items-center gap-2 text-slate-500 mb-1">
                        <span className="font-medium text-slate-900">Sarah Chen</span>
                        <span>•</span>
                        <span>2025-01-15 14:30</span>
                      </div>
                      <p className="text-slate-700">Reviewed transaction patterns. Customer shows regular monthly transfers consistent with stated business activity. No red flags identified.</p>
                    </div>
                    <Separator />
                    <div className="text-sm">
                      <div className="flex items-center gap-2 text-slate-500 mb-1">
                        <span className="font-medium text-slate-900">Michael Roberts</span>
                        <span>•</span>
                        <span>2025-01-10 09:15</span>
                      </div>
                      <p className="text-slate-700">Initial alert review completed. Transaction amounts align with customer profile. Requested additional documentation for verification.</p>
                    </div>
                    <Separator />
                    <div className="text-sm">
                      <div className="flex items-center gap-2 text-slate-500 mb-1">
                        <span className="font-medium text-slate-900">Jennifer Park</span>
                        <span>•</span>
                        <span>2025-01-08 16:45</span>
                      </div>
                      <p className="text-slate-700">Customer contacted via phone. Confirmed legitimate business purpose for transactions. Awaiting supporting documentation.</p>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Paperclip className="w-4 h-4" />
                  Historical Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm p-2 hover:bg-slate-50 rounded-md cursor-pointer border border-slate-200">
                      <Paperclip className="h-4 w-4 text-slate-500" />
                      <span className="flex-1 text-slate-900">Invoice_2025_001.pdf</span>
                      <span className="text-xs text-slate-500">2025-01-14</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm p-2 hover:bg-slate-50 rounded-md cursor-pointer border border-slate-200">
                      <Paperclip className="h-4 w-4 text-slate-500" />
                      <span className="flex-1 text-slate-900">Bank_Statement_Dec2024.pdf</span>
                      <span className="text-xs text-slate-500">2025-01-12</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm p-2 hover:bg-slate-50 rounded-md cursor-pointer border border-slate-200">
                      <Paperclip className="h-4 w-4 text-slate-500" />
                      <span className="flex-1 text-slate-900">Business_License.jpg</span>
                      <span className="text-xs text-slate-500">2025-01-10</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm p-2 hover:bg-slate-50 rounded-md cursor-pointer border border-slate-200">
                      <Paperclip className="h-4 w-4 text-slate-500" />
                      <span className="flex-1 text-slate-900">ID_Verification.pdf</span>
                      <span className="text-xs text-slate-500">2025-01-08</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm p-2 hover:bg-slate-50 rounded-md cursor-pointer border border-slate-200">
                      <Paperclip className="h-4 w-4 text-slate-500" />
                      <span className="flex-1 text-slate-900">Customer_Agreement.pdf</span>
                      <span className="text-xs text-slate-500">2025-01-05</span>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Audit Trail</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  <div className="flex justify-between items-start text-sm">
                    <div>
                      <div className="text-slate-900">Alert created</div>
                      <div className="text-slate-500">System</div>
                    </div>
                    <div className="text-slate-500">
                      {new Date(alert.alertDate).toLocaleString()}
                    </div>
                  </div>
                  <Separator />
                  {alert.owner && (
                    <>
                      <div className="flex justify-between items-start text-sm">
                        <div>
                          <div className="text-slate-900">Alert assigned</div>
                          <div className="text-slate-500">{alert.owner}</div>
                        </div>
                        <div className="text-slate-500">
                          {new Date(alert.lastActivity).toLocaleString()}
                        </div>
                      </div>
                      <Separator />
                    </>
                  )}
                  <div className="flex justify-between items-start text-sm">
                    <div>
                      <div className="text-slate-900">Investigation workspace accessed</div>
                      <div className="text-slate-500">Current User</div>
                    </div>
                    <div className="text-slate-500">Just now</div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
