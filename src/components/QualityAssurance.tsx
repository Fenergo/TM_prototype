import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Checkbox } from './ui/checkbox';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CheckCircle, XCircle, AlertTriangle, RefreshCw, TrendingUp } from 'lucide-react';

export function QualityAssurance() {
  const [selectedSample, setSelectedSample] = useState<string | null>(null);

  const samples = [
    { id: 'QA-2024-045', alert: 'ALT-2024-001012', investigator: 'Emma Williams', status: 'Pending Review', category: 'Closed No Issue', sampleDate: '2024-11-10' },
    { id: 'QA-2024-044', alert: 'ALT-2024-000989', investigator: 'David Kumar', status: 'Passed', category: 'SAR Filed', sampleDate: '2024-11-09', reviewDate: '2024-11-10' },
    { id: 'QA-2024-043', alert: 'ALT-2024-000945', investigator: 'James Park', status: 'Passed', category: 'Case Escalated', sampleDate: '2024-11-08', reviewDate: '2024-11-09' },
    { id: 'QA-2024-042', alert: 'ALT-2024-000876', investigator: 'Sarah Chen', status: 'Failed', category: 'Closed No Issue', sampleDate: '2024-11-07', reviewDate: '2024-11-08', issues: ['Insufficient documentation', 'Incomplete narrative'] },
    { id: 'QA-2024-041', alert: 'ALT-2024-000834', investigator: 'Marcus Rodriguez', status: 'Passed', category: 'Closed No Issue', sampleDate: '2024-11-06', reviewDate: '2024-11-07' }
  ];

  const checklist = [
    { id: 1, item: 'Alert properly assigned and acknowledged', checked: true },
    { id: 2, item: 'Investigation completed within SLA', checked: true },
    { id: 3, item: 'Entity profile and KYC reviewed', checked: true },
    { id: 4, item: 'Transaction details verified and documented', checked: true },
    { id: 5, item: 'Related parties and networks analyzed', checked: true },
    { id: 6, item: 'Evidence properly attached and referenced', checked: false },
    { id: 7, item: 'Decision rationale clearly documented', checked: true },
    { id: 8, item: 'Narrative meets regulatory standards', checked: true },
    { id: 9, item: 'Closure reason appropriate and justified', checked: true },
    { id: 10, item: 'Audit trail complete and accurate', checked: true }
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { icon: React.ReactNode, className: string }> = {
      'Pending Review': { icon: <AlertTriangle className="w-4 h-4" />, className: 'bg-amber-500' },
      'Passed': { icon: <CheckCircle className="w-4 h-4" />, className: 'bg-green-600' },
      'Failed': { icon: <XCircle className="w-4 h-4" />, className: 'bg-red-600' }
    };
    return (
      <Badge className={variants[status].className}>
        {variants[status].icon}
        <span className="ml-1">{status}</span>
      </Badge>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">Quality Assurance</h1>
          <p className="text-slate-500">Dip sampling, review, and oversight</p>
        </div>
        <Button>
          <RefreshCw className="w-4 h-4 mr-2" />
          Generate Sample
        </Button>
      </div>

      <div className="grid grid-cols-5 gap-4">
        <Card className="kpi-card">
          <CardHeader className="pb-3 card-header">
            <CardTitle className="text-sm text-slate-500">Total Samples</CardTitle>
          </CardHeader>
          <CardContent className="card-content">
            <div className="text-2xl font-semibold text-slate-900 kpi-value">{samples.length}</div>
            <p className="text-xs text-slate-500 mt-1">This month</p>
          </CardContent>
        </Card>
        <Card className="kpi-card">
          <CardHeader className="pb-3 card-header">
            <CardTitle className="text-sm text-slate-500 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Passed
            </CardTitle>
          </CardHeader>
          <CardContent className="card-content">
            <div className="text-2xl font-semibold text-slate-900 kpi-value">
              {samples.filter(s => s.status === 'Passed').length}
            </div>
            <p className="text-xs text-slate-500 mt-1">94% pass rate</p>
          </CardContent>
        </Card>
        <Card className="kpi-card">
          <CardHeader className="pb-3 card-header">
            <CardTitle className="text-sm text-slate-500 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-500" />
              Failed
            </CardTitle>
          </CardHeader>
          <CardContent className="card-content">
            <div className="text-2xl font-semibold text-slate-900 kpi-value">
              {samples.filter(s => s.status === 'Failed').length}
            </div>
            <p className="text-xs text-slate-500 mt-1">Requires remediation</p>
          </CardContent>
        </Card>
        <Card className="kpi-card">
          <CardHeader className="pb-3 card-header">
            <CardTitle className="text-sm text-slate-500 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent className="card-content">
            <div className="text-2xl font-semibold text-slate-900 kpi-value">
              {samples.filter(s => s.status === 'Pending Review').length}
            </div>
            <p className="text-xs text-slate-500 mt-1">Awaiting review</p>
          </CardContent>
        </Card>
        <Card className="kpi-card">
          <CardHeader className="pb-3 card-header">
            <CardTitle className="text-sm text-slate-500 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              Improvement
            </CardTitle>
          </CardHeader>
          <CardContent className="card-content">
            <div className="text-2xl font-semibold text-green-600 kpi-value">+3%</div>
            <p className="text-xs text-slate-500 mt-1">vs last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="samples">
        <TabsList>
          <TabsTrigger value="samples">QA Samples</TabsTrigger>
          <TabsTrigger value="review">Review</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="samples">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Quality Assurance Samples</CardTitle>
                <Select defaultValue="all">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending Review</SelectItem>
                    <SelectItem value="passed">Passed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>QA Sample ID</TableHead>
                    <TableHead>Alert ID</TableHead>
                    <TableHead>Investigator</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sample Date</TableHead>
                    <TableHead>Review Date</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {samples.map((sample) => (
                    <TableRow 
                      key={sample.id}
                      className="cursor-pointer hover:bg-slate-50"
                      onClick={() => setSelectedSample(sample.id)}
                    >
                      <TableCell className="text-blue-600">{sample.id}</TableCell>
                      <TableCell className="text-blue-600">{sample.alert}</TableCell>
                      <TableCell className="text-slate-600">{sample.investigator}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{sample.category}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(sample.status)}</TableCell>
                      <TableCell className="text-slate-600 text-sm">
                        {new Date(sample.sampleDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-slate-600 text-sm">
                        {sample.reviewDate ? new Date(sample.reviewDate).toLocaleDateString() : '—'}
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Review</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="review">
          <Card>
            <CardHeader>
              <CardTitle>QA Review Checklist</CardTitle>
              <p className="text-sm text-slate-500">
                Sample: {selectedSample || 'QA-2024-045'} • Alert: ALT-2024-001012
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                {checklist.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <Checkbox defaultChecked={item.checked} className="mt-1" />
                    <div className="flex-1">
                      <div className="text-slate-900">{item.item}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="text-sm text-slate-700 mb-2 block">QA Notes & Findings</label>
                <Textarea 
                  placeholder="Document any issues, observations, or recommendations..."
                  className="min-h-[120px]"
                />
              </div>

              <div>
                <label className="text-sm text-slate-700 mb-2 block">Overall Assessment</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select assessment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pass">Pass - Meets all standards</SelectItem>
                    <SelectItem value="pass-minor">Pass - Minor issues noted</SelectItem>
                    <SelectItem value="fail-major">Fail - Major issues require remediation</SelectItem>
                    <SelectItem value="fail-critical">Fail - Critical issues identified</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">Save Draft</Button>
                <Button>Complete Review</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>QA Performance by Investigator</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Investigator</TableHead>
                      <TableHead>Samples Reviewed</TableHead>
                      <TableHead>Pass Rate</TableHead>
                      <TableHead>Common Issues</TableHead>
                      <TableHead>Trend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: 'Emma Williams', samples: 12, passRate: 92, issues: 'Minor documentation gaps', trend: 'up' },
                      { name: 'David Kumar', samples: 10, passRate: 100, issues: 'None', trend: 'stable' },
                      { name: 'Sarah Chen', samples: 15, passRate: 87, issues: 'Narrative completeness', trend: 'down' },
                      { name: 'Marcus Rodriguez', samples: 11, passRate: 91, issues: 'Evidence attachment', trend: 'up' },
                      { name: 'James Park', samples: 9, passRate: 100, issues: 'None', trend: 'up' }
                    ].map((inv, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-slate-900">{inv.name}</TableCell>
                        <TableCell>{inv.samples}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`px-2 py-1 rounded text-sm ${
                              inv.passRate >= 95 ? 'bg-green-100 text-green-700' :
                              inv.passRate >= 85 ? 'bg-blue-100 text-blue-700' :
                              'bg-amber-100 text-amber-700'
                            }`}>
                              {inv.passRate}%
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-600 text-sm">{inv.issues}</TableCell>
                        <TableCell>
                          {inv.trend === 'up' ? (
                            <div className="flex items-center gap-1 text-green-600">
                              <TrendingUp className="w-4 h-4" />
                              <span className="text-sm">Improving</span>
                            </div>
                          ) : inv.trend === 'down' ? (
                            <div className="flex items-center gap-1 text-red-600">
                              <TrendingUp className="w-4 h-4 rotate-180" />
                              <span className="text-sm">Declining</span>
                            </div>
                          ) : (
                            <span className="text-sm text-slate-500">Stable</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Common QA Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { issue: 'Insufficient documentation', count: 8, severity: 'Medium' },
                    { issue: 'Incomplete narrative', count: 5, severity: 'High' },
                    { issue: 'Missing evidence attachments', count: 4, severity: 'Medium' },
                    { issue: 'Inadequate counterparty analysis', count: 3, severity: 'High' },
                    { issue: 'SLA breach not justified', count: 2, severity: 'Low' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="text-slate-900">{item.issue}</div>
                        <div className="text-sm text-slate-500 mt-1">
                          Found in {item.count} samples this month
                        </div>
                      </div>
                      <Badge variant={item.severity === 'High' ? 'destructive' : item.severity === 'Medium' ? 'default' : 'outline'}>
                        {item.severity} Severity
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
