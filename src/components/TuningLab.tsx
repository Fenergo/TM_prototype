import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Separator } from './ui/separator';
import { Target, Play, TrendingUp, TrendingDown, CheckCircle, AlertTriangle, Beaker } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function TuningLab() {
  const [threshold, setThreshold] = useState([10000]);
  const [lookbackDays, setLookbackDays] = useState([30]);

  const scenarios = [
    { id: 'SCN-001', name: 'Structuring Detection v2.3', type: 'Rule-Based', status: 'Champion', alerts: 56, fpRate: 28, sarRate: 12, lastTuned: '2024-10-15' },
    { id: 'SCN-002', name: 'Rapid Movement ML Model', type: 'ML Supervised', status: 'Champion', alerts: 44, fpRate: 32, sarRate: 15, lastTuned: '2024-10-22' },
    { id: 'SCN-003', name: 'Network Anomaly Detection', type: 'Graph ML', status: 'Champion', alerts: 32, fpRate: 25, sarRate: 18, lastTuned: '2024-10-08' },
    { id: 'SCN-004', name: 'Omnibus Pattern Analyzer', type: 'Rule-Based', status: 'Champion', alerts: 28, fpRate: 35, sarRate: 11, lastTuned: '2024-11-01' },
    { id: 'SCN-005', name: 'Cross-Border Flow Detector', type: 'Hybrid', status: 'Challenger', alerts: 15, fpRate: 22, sarRate: 21, lastTuned: '2024-11-05' }
  ];

  const backtestResults = [
    { scenario: 'Current', alerts: 192, truePositives: 21, falsePositives: 171, sarRate: 10.9, precision: 10.9, recall: 95.5 },
    { scenario: 'Threshold +10%', alerts: 168, truePositives: 20, falsePositives: 148, sarRate: 11.9, precision: 11.9, recall: 90.9 },
    { scenario: 'Threshold +20%', alerts: 145, truePositives: 19, falsePositives: 126, sarRate: 13.1, precision: 13.1, recall: 86.4 },
    { scenario: 'Threshold +30%', alerts: 124, truePositives: 17, falsePositives: 107, sarRate: 13.7, precision: 13.7, recall: 77.3 }
  ];

  const performanceTrend = [
    { month: 'Jun', alerts: 167, sarRate: 9.0, fpRate: 36.5 },
    { month: 'Jul', alerts: 189, sarRate: 10.1, fpRate: 34.8 },
    { month: 'Aug', alerts: 203, sarRate: 10.3, fpRate: 33.2 },
    { month: 'Sep', alerts: 178, sarRate: 9.6, fpRate: 35.1 },
    { month: 'Oct', alerts: 192, sarRate: 10.9, fpRate: 32.3 }
  ];

  const segmentation = [
    { segment: 'High-Net-Worth Individuals', entities: 456, alertRate: 8.5, sarConversion: 14.2 },
    { segment: 'Corporate - High Risk Jurisdiction', entities: 89, alertRate: 22.3, sarConversion: 18.9 },
    { segment: 'Funds - Alternative Assets', entities: 234, alertRate: 12.1, sarConversion: 9.4 },
    { segment: 'Distributors - EMEA', entities: 67, alertRate: 15.6, sarConversion: 13.4 },
    { segment: 'Retail - Standard Risk', entities: 1823, alertRate: 3.2, sarConversion: 6.1 }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">Tuning Lab</h1>
          <p className="text-slate-500">Scenario optimization, backtesting & model governance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Beaker className="w-4 h-4 mr-2" />
            New Experiment
          </Button>
          <Button>
            <Target className="w-4 h-4 mr-2" />
            Deploy Champion
          </Button>
        </div>
      </div>

      <Tabs defaultValue="scenarios">
        <TabsList>
          <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
          <TabsTrigger value="tuning">Tuning</TabsTrigger>
          <TabsTrigger value="backtesting">Backtesting</TabsTrigger>
          <TabsTrigger value="segmentation">Segmentation</TabsTrigger>
          <TabsTrigger value="governance">Governance</TabsTrigger>
        </TabsList>

        <TabsContent value="scenarios" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Scenarios</CardTitle>
              <p className="text-sm text-slate-500">
                Detection rules and models in production and testing
              </p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Scenario ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Alerts (30d)</TableHead>
                    <TableHead>FP Rate</TableHead>
                    <TableHead>SAR Rate</TableHead>
                    <TableHead>Last Tuned</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scenarios.map((scenario) => (
                    <TableRow key={scenario.id}>
                      <TableCell className="text-blue-600">{scenario.id}</TableCell>
                      <TableCell className="text-slate-900">{scenario.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{scenario.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={scenario.status === 'Champion' ? 'default' : 'secondary'}>
                          {scenario.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{scenario.alerts}</TableCell>
                      <TableCell>
                        <div className={`flex items-center gap-1 ${
                          scenario.fpRate < 30 ? 'text-green-600' : 
                          scenario.fpRate < 35 ? 'text-amber-600' : 
                          'text-red-600'
                        }`}>
                          {scenario.fpRate}%
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`flex items-center gap-1 ${
                          scenario.sarRate > 15 ? 'text-green-600' : 
                          scenario.sarRate > 10 ? 'text-amber-600' : 
                          'text-slate-600'
                        }`}>
                          {scenario.sarRate}%
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600 text-sm">
                        {new Date(scenario.lastTuned).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Configure</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Trend</CardTitle>
              <p className="text-sm text-slate-500">Alert volume and quality metrics over time</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis yAxisId="left" stroke="#64748b" />
                  <YAxis yAxisId="right" orientation="right" stroke="#64748b" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="alerts" stroke="#3b82f6" strokeWidth={2} name="Alert Volume" />
                  <Line yAxisId="right" type="monotone" dataKey="sarRate" stroke="#10b981" strokeWidth={2} name="SAR Rate %" />
                  <Line yAxisId="right" type="monotone" dataKey="fpRate" stroke="#ef4444" strokeWidth={2} name="FP Rate %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tuning" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scenario Parameter Tuning</CardTitle>
              <p className="text-sm text-slate-500">
                Adjust thresholds and parameters to optimize detection performance
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Select Scenario</Label>
                <Select defaultValue="scn-001">
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {scenarios.map((s) => (
                      <SelectItem key={s.id} value={s.id.toLowerCase()}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label>Transaction Amount Threshold</Label>
                      <span className="text-sm text-slate-600">${threshold[0].toLocaleString()}</span>
                    </div>
                    <Slider 
                      value={threshold} 
                      onValueChange={setThreshold}
                      min={5000}
                      max={50000}
                      step={1000}
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>$5,000</span>
                      <span>$50,000</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label>Lookback Period (days)</Label>
                      <span className="text-sm text-slate-600">{lookbackDays[0]} days</span>
                    </div>
                    <Slider 
                      value={lookbackDays} 
                      onValueChange={setLookbackDays}
                      min={7}
                      max={90}
                      step={1}
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>7 days</span>
                      <span>90 days</span>
                    </div>
                  </div>

                  <div>
                    <Label>Transaction Count Threshold</Label>
                    <Input type="number" defaultValue="5" className="mt-2" />
                  </div>

                  <div>
                    <Label>Risk Score Minimum</Label>
                    <Input type="number" defaultValue="60" className="mt-2" />
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-slate-50">
                  <div className="text-sm text-slate-700 mb-4">Expected Impact</div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                      <span className="text-sm text-slate-600">Alert Volume</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-900">168</span>
                        <div className="flex items-center text-green-600 text-sm">
                          <TrendingDown className="w-4 h-4" />
                          -12%
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                      <span className="text-sm text-slate-600">False Positive Rate</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-900">29.8%</span>
                        <div className="flex items-center text-green-600 text-sm">
                          <TrendingDown className="w-4 h-4" />
                          -2.5%
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                      <span className="text-sm text-slate-600">SAR Conversion</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-900">11.9%</span>
                        <div className="flex items-center text-green-600 text-sm">
                          <TrendingUp className="w-4 h-4" />
                          +1.0%
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                      <span className="text-sm text-slate-600">Estimated Recall</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-900">90.9%</span>
                        <div className="flex items-center text-amber-600 text-sm">
                          <TrendingDown className="w-4 h-4" />
                          -4.6%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-end gap-2">
                <Button variant="outline">Reset to Current</Button>
                <Button variant="outline">
                  <Play className="w-4 h-4 mr-2" />
                  Run Simulation
                </Button>
                <Button>Save as Challenger</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backtesting" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Backtest Results</CardTitle>
              <p className="text-sm text-slate-500">
                Historical performance comparison for threshold variations
              </p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Scenario</TableHead>
                    <TableHead>Total Alerts</TableHead>
                    <TableHead>True Positives</TableHead>
                    <TableHead>False Positives</TableHead>
                    <TableHead>SAR Rate %</TableHead>
                    <TableHead>Precision %</TableHead>
                    <TableHead>Recall %</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {backtestResults.map((result, idx) => (
                    <TableRow key={idx} className={idx === 0 ? 'bg-blue-50' : ''}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-900">{result.scenario}</span>
                          {idx === 0 && <Badge variant="outline">Current</Badge>}
                        </div>
                      </TableCell>
                      <TableCell>{result.alerts}</TableCell>
                      <TableCell className="text-green-600">{result.truePositives}</TableCell>
                      <TableCell className="text-red-600">{result.falsePositives}</TableCell>
                      <TableCell>
                        <div className={`${
                          result.sarRate > 12 ? 'text-green-600' : 
                          result.sarRate > 10 ? 'text-amber-600' : 
                          'text-slate-600'
                        }`}>
                          {result.sarRate.toFixed(1)}%
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`${
                          result.precision > 12 ? 'text-green-600' : 
                          result.precision > 10 ? 'text-amber-600' : 
                          'text-slate-600'
                        }`}>
                          {result.precision.toFixed(1)}%
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`${
                          result.recall > 90 ? 'text-green-600' : 
                          result.recall > 85 ? 'text-amber-600' : 
                          'text-red-600'
                        }`}>
                          {result.recall.toFixed(1)}%
                        </div>
                      </TableCell>
                      <TableCell>
                        {idx !== 0 && (
                          <Button variant="outline" size="sm">Deploy</Button>
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
              <CardTitle>Backtest Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={backtestResults}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="scenario" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="truePositives" fill="#10b981" name="True Positives" />
                  <Bar dataKey="falsePositives" fill="#ef4444" name="False Positives" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommendation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <div className="text-green-900">Threshold +20% shows optimal balance</div>
                  <p className="text-sm text-green-700 mt-1">
                    This configuration reduces alert volume by 24% while maintaining 86.4% recall and improving 
                    precision to 13.1%. Consider deploying as challenger for 2-week validation period.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segmentation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Segmentation</CardTitle>
              <p className="text-sm text-slate-500">
                Dynamic peer groups for risk-based monitoring
              </p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Segment</TableHead>
                    <TableHead>Entities</TableHead>
                    <TableHead>Alert Rate %</TableHead>
                    <TableHead>SAR Conversion %</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {segmentation.map((seg, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="text-slate-900">{seg.segment}</TableCell>
                      <TableCell>{seg.entities}</TableCell>
                      <TableCell>
                        <div className={`${
                          seg.alertRate > 15 ? 'text-red-600' : 
                          seg.alertRate > 10 ? 'text-amber-600' : 
                          'text-green-600'
                        }`}>
                          {seg.alertRate.toFixed(1)}%
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`${
                          seg.sarConversion > 15 ? 'text-green-600' : 
                          seg.sarConversion > 10 ? 'text-amber-600' : 
                          'text-slate-600'
                        }`}>
                          {seg.sarConversion.toFixed(1)}%
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Configure</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Segment Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={segmentation}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="segment" stroke="#64748b" angle={-15} textAnchor="end" height={100} />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="alertRate" fill="#3b82f6" name="Alert Rate %" />
                  <Bar dataKey="sarConversion" fill="#10b981" name="SAR Conversion %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="governance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Model Governance Dashboard</CardTitle>
              <p className="text-sm text-slate-500">
                Version control, approvals, and audit trail
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    scenario: 'Structuring Detection v2.3', 
                    version: 'v2.3.1',
                    status: 'Production',
                    approver: 'Jane Smith, MLRO',
                    approvalDate: '2024-10-15',
                    nextReview: '2025-01-15',
                    driftStatus: 'Normal'
                  },
                  { 
                    scenario: 'Rapid Movement ML Model', 
                    version: 'v1.5.2',
                    status: 'Production',
                    approver: 'John Doe, Head of Compliance',
                    approvalDate: '2024-10-22',
                    nextReview: '2025-01-22',
                    driftStatus: 'Normal'
                  },
                  { 
                    scenario: 'Cross-Border Flow Detector', 
                    version: 'v1.0.0',
                    status: 'Pending Approval',
                    approver: 'Awaiting review',
                    approvalDate: '—',
                    nextReview: '—',
                    driftStatus: 'N/A'
                  }
                ].map((model, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-slate-900">{model.scenario}</div>
                        <div className="text-sm text-slate-500 mt-1">Version: {model.version}</div>
                      </div>
                      <Badge variant={
                        model.status === 'Production' ? 'default' : 
                        model.status === 'Pending Approval' ? 'outline' :
                        'secondary'
                      }>
                        {model.status}
                      </Badge>
                    </div>
                    <Separator className="my-3" />
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-500">Approver:</span>
                        <div className="text-slate-900 mt-1">{model.approver}</div>
                      </div>
                      <div>
                        <span className="text-slate-500">Approval Date:</span>
                        <div className="text-slate-900 mt-1">{model.approvalDate}</div>
                      </div>
                      <div>
                        <span className="text-slate-500">Next Review:</span>
                        <div className="text-slate-900 mt-1">{model.nextReview}</div>
                      </div>
                      <div>
                        <span className="text-slate-500">Drift Status:</span>
                        <div className="mt-1">
                          {model.driftStatus === 'Normal' ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {model.driftStatus}
                            </Badge>
                          ) : model.driftStatus === 'N/A' ? (
                            <span className="text-slate-500">{model.driftStatus}</span>
                          ) : (
                            <Badge variant="destructive">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              {model.driftStatus}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change Control Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: '2024-11-05', change: 'Cross-Border Flow Detector v1.0.0 submitted for approval', user: 'Sarah Chen', type: 'New Model' },
                  { date: '2024-11-01', change: 'Omnibus Pattern Analyzer threshold adjusted to $15,000', user: 'Marcus Rodriguez', type: 'Parameter Change' },
                  { date: '2024-10-22', change: 'Rapid Movement ML Model v1.5.2 approved for production', user: 'John Doe', type: 'Approval' },
                  { date: '2024-10-15', change: 'Structuring Detection v2.3.1 deployed to production', user: 'System', type: 'Deployment' }
                ].map((log, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-slate-500">{log.date}</span>
                        <Badge variant="outline">{log.type}</Badge>
                      </div>
                      <div className="text-slate-900">{log.change}</div>
                      <div className="text-sm text-slate-500 mt-1">by {log.user}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
