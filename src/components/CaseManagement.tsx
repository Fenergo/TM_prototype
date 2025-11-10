import { useState } from 'react';
import { mockCases, type Case } from '../lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { FileText, Plus, Send, CheckCircle, AlertCircle, Clock, Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';

export function CaseManagement() {
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredCases = mockCases.filter(c => 
    statusFilter === 'all' || c.status === statusFilter
  );

  const getStatusBadge = (status: Case['status']) => {
    const variants: Record<Case['status'], { variant: 'default' | 'secondary' | 'destructive' | 'outline', className?: string }> = {
      'Draft': { variant: 'outline' },
      'In Progress': { variant: 'default', className: 'bg-blue-500' },
      'Pending QA': { variant: 'default', className: 'bg-amber-500' },
      'SAR Filed': { variant: 'default', className: 'bg-green-600' },
      'Closed': { variant: 'secondary' }
    };
    return <Badge variant={variants[status].variant} className={variants[status].className}>{status}</Badge>;
  };

  const getSARStatusBadge = (sarStatus?: Case['sarStatus']) => {
    if (!sarStatus) return null;
    
    const variants: Record<NonNullable<Case['sarStatus']>, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      'Not Filed': 'outline',
      'Preparing': 'default',
      'Filed': 'secondary',
      'Acknowledged': 'secondary'
    };
    return <Badge variant={variants[sarStatus]}>{sarStatus}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">Case Management</h1>
          <p className="text-slate-500">Aggregate alerts, build narratives, and file SARs</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Case
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Case</DialogTitle>
              <DialogDescription>
                Aggregate related alerts into a case for investigation and potential SAR filing
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Case Subject</Label>
                <Input placeholder="Brief description of the case..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Jurisdiction</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select jurisdiction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States (FinCEN)</SelectItem>
                      <SelectItem value="uk">United Kingdom (NCA)</SelectItem>
                      <SelectItem value="eu">European Union (goAML)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Related Alerts (comma separated IDs)</Label>
                <Input placeholder="ALT-2024-001234, ALT-2024-001189..." />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Create Case</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-500">Total Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">{mockCases.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-500">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">
              {mockCases.filter(c => c.status === 'In Progress').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-500">Pending QA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">
              {mockCases.filter(c => c.status === 'Pending QA').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-500">SARs Filed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">
              {mockCases.filter(c => c.sarStatus === 'Filed').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Cases</CardTitle>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Pending QA">Pending QA</SelectItem>
                <SelectItem value="SAR Filed">SAR Filed</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Case ID</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>SAR Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Alerts</TableHead>
                <TableHead>Jurisdiction</TableHead>
                <TableHead>Created</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCases.map((caseItem) => (
                <TableRow 
                  key={caseItem.id}
                  className="cursor-pointer hover:bg-slate-50"
                  onClick={() => setSelectedCase(caseItem)}
                >
                  <TableCell className="text-blue-600">{caseItem.id}</TableCell>
                  <TableCell className="max-w-md">
                    <div className="truncate">{caseItem.subject}</div>
                  </TableCell>
                  <TableCell>{getStatusBadge(caseItem.status)}</TableCell>
                  <TableCell>{getSARStatusBadge(caseItem.sarStatus)}</TableCell>
                  <TableCell>
                    <Badge variant={caseItem.priority === 'High' ? 'destructive' : 'default'}>
                      {caseItem.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-600">{caseItem.assignee}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{caseItem.alerts.length}</Badge>
                  </TableCell>
                  <TableCell className="uppercase text-sm">{caseItem.jurisdiction}</TableCell>
                  <TableCell className="text-slate-600 text-sm">
                    {new Date(caseItem.createdDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Open</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedCase && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{selectedCase.id}</CardTitle>
                <p className="text-slate-500 mt-1">{selectedCase.subject}</p>
              </div>
              <div className="flex gap-2">
                {selectedCase.status === 'Pending QA' && (
                  <Button variant="outline">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                )}
                {selectedCase.sarStatus === 'Preparing' && (
                  <Button>
                    <Send className="w-4 h-4 mr-2" />
                    File SAR
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="narrative">Narrative</TabsTrigger>
                <TabsTrigger value="sar">SAR Filing</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Case ID</div>
                      <div className="text-slate-900">{selectedCase.id}</div>
                    </div>
                    <Separator />
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Created Date</div>
                      <div className="text-slate-900">
                        {new Date(selectedCase.createdDate).toLocaleString()}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Status</div>
                      <div>{getStatusBadge(selectedCase.status)}</div>
                    </div>
                    <Separator />
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Priority</div>
                      <div>
                        <Badge variant={selectedCase.priority === 'High' ? 'destructive' : 'default'}>
                          {selectedCase.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Assignee</div>
                      <div className="text-slate-900">{selectedCase.assignee}</div>
                    </div>
                    <Separator />
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Jurisdiction</div>
                      <div className="text-slate-900 uppercase">{selectedCase.jurisdiction}</div>
                    </div>
                    <Separator />
                    <div>
                      <div className="text-sm text-slate-500 mb-1">SAR Status</div>
                      <div>{getSARStatusBadge(selectedCase.sarStatus)}</div>
                    </div>
                    <Separator />
                    {selectedCase.filingDeadline && (
                      <div>
                        <div className="text-sm text-slate-500 mb-1 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Filing Deadline
                        </div>
                        <div className="text-slate-900">
                          {new Date(selectedCase.filingDeadline).toLocaleDateString()}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="text-sm text-slate-500 mb-2">Related Alerts</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCase.alerts.map((alertId) => (
                      <Badge key={alertId} variant="outline" className="text-blue-600">
                        {alertId}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="text-sm text-slate-500 mb-2">Related Entities</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCase.entities.map((entityId) => (
                      <Badge key={entityId} variant="outline">
                        {entityId}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="narrative" className="space-y-4">
                <div>
                  <Label>Investigation Narrative</Label>
                  <Textarea 
                    className="min-h-[300px] mt-2"
                    defaultValue={selectedCase.narrative}
                    placeholder="Document your investigation findings, suspicious activity patterns, and supporting evidence..."
                  />
                </div>
                <div className="flex justify-end">
                  <Button>Save Narrative</Button>
                </div>
              </TabsContent>

              <TabsContent value="sar" className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="text-blue-900">SAR Filing Automation</div>
                      <p className="text-sm text-blue-700 mt-1">
                        This section would include jurisdiction-specific SAR templates (FinCEN BSA e-Filing, 
                        UK NCA SAR Online, goAML XML) with pre-populated fields and narrative builder.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label>Filing Jurisdiction</Label>
                    <Input 
                      className="mt-2"
                      value={selectedCase.jurisdiction === 'US' ? 'FinCEN (United States)' : 
                             selectedCase.jurisdiction === 'UK' ? 'NCA (United Kingdom)' : 
                             'goAML'}
                      disabled
                    />
                  </div>
                  <div>
                    <Label>SAR Type</Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select SAR type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="initial">Initial SAR</SelectItem>
                        <SelectItem value="continuing">Continuing Activity</SelectItem>
                        <SelectItem value="corrected">Corrected SAR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Suspicious Activity Classification</Label>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select classification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="structuring">Structuring</SelectItem>
                      <SelectItem value="layering">Layering</SelectItem>
                      <SelectItem value="shell">Shell Company</SelectItem>
                      <SelectItem value="rapid">Rapid Movement</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>SAR Narrative (Auto-generated template)</Label>
                  <Textarea 
                    className="min-h-[200px] mt-2"
                    defaultValue={selectedCase.narrative}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Preview SAR</Button>
                  <Button>
                    <Send className="w-4 h-4 mr-2" />
                    Submit to Regulator
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      <div className="w-0.5 h-16 bg-slate-200" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-slate-500 mb-1">
                        {new Date(selectedCase.createdDate).toLocaleString()}
                      </div>
                      <div className="text-slate-900">Case created</div>
                      <div className="text-sm text-slate-600 mt-1">By {selectedCase.assignee}</div>
                    </div>
                  </div>

                  {selectedCase.sarStatus === 'Preparing' && (
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-amber-500" />
                        <div className="w-0.5 h-16 bg-slate-200" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-slate-500 mb-1">In Progress</div>
                        <div className="text-slate-900">SAR preparation started</div>
                      </div>
                    </div>
                  )}

                  {selectedCase.sarStatus === 'Filed' && (
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-slate-500 mb-1">2024-11-05 14:20:00</div>
                        <div className="text-slate-900">SAR filed with regulator</div>
                        <div className="text-sm text-slate-600 mt-1">
                          Filed with {selectedCase.jurisdiction === 'US' ? 'FinCEN' : 'NCA'}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
