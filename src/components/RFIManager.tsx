import { useState } from 'react';
import { mockRFIs, type RFI } from '../lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Mail, Send, Clock, CheckCircle, AlertTriangle, Plus, ExternalLink } from 'lucide-react';

export function RFIManager() {
  const [selectedRFI, setSelectedRFI] = useState<RFI | null>(null);

  const getStatusBadge = (status: RFI['status']) => {
    const variants: Record<RFI['status'], { variant: 'default' | 'secondary' | 'destructive' | 'outline', className?: string }> = {
      'Draft': { variant: 'outline' },
      'Sent': { variant: 'default', className: 'bg-blue-500' },
      'Awaiting': { variant: 'default', className: 'bg-amber-500' },
      'Overdue': { variant: 'destructive' },
      'Responded': { variant: 'default', className: 'bg-green-600' },
      'Verified': { variant: 'secondary' },
      'Closed': { variant: 'secondary' }
    };
    return <Badge variant={variants[status].variant} className={variants[status].className}>{status}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">RFI Manager</h1>
          <p className="text-slate-500">Request for Information - Internal & External</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New RFI
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New RFI</DialogTitle>
              <DialogDescription>
                Request additional information from internal teams or external parties
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>RFI Type</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="internal">Internal</SelectItem>
                    <SelectItem value="external">External</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Subject</Label>
                <Input className="mt-2" placeholder="Brief description of information needed..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Recipient</Label>
                  <Input className="mt-2" placeholder="Name or email..." />
                </div>
                <div>
                  <Label>Due Date</Label>
                  <Input className="mt-2" type="date" />
                </div>
              </div>
              <div>
                <Label>Related Alert IDs (comma separated)</Label>
                <Input className="mt-2" placeholder="ALT-2024-001234, ALT-2024-001189..." />
              </div>
              <div>
                <Label>Questions / Information Requested</Label>
                <Textarea 
                  className="mt-2 min-h-[120px]"
                  placeholder="List specific questions or information needed..."
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Save as Draft</Button>
                <Button>
                  <Send className="w-4 h-4 mr-2" />
                  Send RFI
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-500">Total RFIs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">{mockRFIs.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-500 flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-500" />
              Sent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">
              {mockRFIs.filter(r => r.status === 'Sent' || r.status === 'Awaiting').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-500 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              Awaiting Response
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">
              {mockRFIs.filter(r => r.status === 'Awaiting').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-500 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Responded
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">
              {mockRFIs.filter(r => r.status === 'Responded').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All RFIs</TabsTrigger>
          <TabsTrigger value="internal">Internal</TabsTrigger>
          <TabsTrigger value="external">External</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>RFI ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Related Alerts</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockRFIs.map((rfi) => (
                    <TableRow 
                      key={rfi.id}
                      className="cursor-pointer hover:bg-slate-50"
                      onClick={() => setSelectedRFI(rfi)}
                    >
                      <TableCell className="text-blue-600">{rfi.id}</TableCell>
                      <TableCell>
                        <Badge variant={rfi.type === 'External' ? 'default' : 'outline'}>
                          {rfi.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-md">
                        <div className="truncate">{rfi.subject}</div>
                      </TableCell>
                      <TableCell className="text-slate-600">{rfi.recipient}</TableCell>
                      <TableCell>{getStatusBadge(rfi.status)}</TableCell>
                      <TableCell className="text-slate-600 text-sm">
                        {new Date(rfi.dueDate).toLocaleDateString()}
                        {rfi.status === 'Overdue' && (
                          <AlertTriangle className="w-4 h-4 text-amber-500 inline ml-2" />
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{rfi.relatedAlerts.length}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="internal">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>RFI ID</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockRFIs.filter(r => r.type === 'Internal').map((rfi) => (
                    <TableRow key={rfi.id}>
                      <TableCell className="text-blue-600">{rfi.id}</TableCell>
                      <TableCell>{rfi.subject}</TableCell>
                      <TableCell>{rfi.recipient}</TableCell>
                      <TableCell>{getStatusBadge(rfi.status)}</TableCell>
                      <TableCell>{new Date(rfi.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="external">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>RFI ID</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockRFIs.filter(r => r.type === 'External').map((rfi) => (
                    <TableRow key={rfi.id}>
                      <TableCell className="text-blue-600">{rfi.id}</TableCell>
                      <TableCell>{rfi.subject}</TableCell>
                      <TableCell>{rfi.recipient}</TableCell>
                      <TableCell>{getStatusBadge(rfi.status)}</TableCell>
                      <TableCell>{new Date(rfi.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overdue">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8 text-slate-500">
                No overdue RFIs
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedRFI && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{selectedRFI.id}</CardTitle>
                <p className="text-slate-500 mt-1">{selectedRFI.subject}</p>
              </div>
              <div className="flex gap-2">
                {selectedRFI.type === 'External' && selectedRFI.status === 'Sent' && (
                  <Button variant="outline">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Secure Portal
                  </Button>
                )}
                {selectedRFI.status === 'Responded' && (
                  <Button>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Verify & Close
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-slate-500 mb-1">RFI Type</div>
                  <Badge variant={selectedRFI.type === 'External' ? 'default' : 'outline'}>
                    {selectedRFI.type}
                  </Badge>
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-slate-500 mb-1">Status</div>
                  {getStatusBadge(selectedRFI.status)}
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-slate-500 mb-1">Recipient</div>
                  <div className="text-slate-900">{selectedRFI.recipient}</div>
                </div>
              </div>

              <div className="space-y-4">
                {selectedRFI.sentDate && (
                  <>
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Sent Date</div>
                      <div className="text-slate-900">
                        {new Date(selectedRFI.sentDate).toLocaleString()}
                      </div>
                    </div>
                    <Separator />
                  </>
                )}
                <div>
                  <div className="text-sm text-slate-500 mb-1">Due Date</div>
                  <div className="text-slate-900">
                    {new Date(selectedRFI.dueDate).toLocaleString()}
                  </div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-slate-500 mb-2">Related Alerts</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedRFI.relatedAlerts.map((alertId) => (
                      <Badge key={alertId} variant="outline" className="text-blue-600">
                        {alertId}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <div className="mb-4">Questions & Responses</div>
              <div className="space-y-4">
                {selectedRFI.questions.map((q, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="text-slate-900 mb-2">Q{idx + 1}: {q.question}</div>
                    {q.response ? (
                      <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                          <div className="flex-1">
                            <div className="text-sm text-green-900">{q.response}</div>
                            {q.responseDate && (
                              <div className="text-xs text-green-700 mt-1">
                                Responded: {new Date(q.responseDate).toLocaleString()}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Clock className="w-4 h-4" />
                          Awaiting response
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
