import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Activity, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Badge } from './ui/badge';

export function Analytics() {
  const alertVolumeData = [
    { month: 'May', alerts: 145, closed: 128, sarFiled: 12 },
    { month: 'Jun', alerts: 167, closed: 152, sarFiled: 15 },
    { month: 'Jul', alerts: 189, closed: 170, sarFiled: 19 },
    { month: 'Aug', alerts: 203, closed: 185, sarFiled: 21 },
    { month: 'Sep', alerts: 178, closed: 165, sarFiled: 17 },
    { month: 'Oct', alerts: 192, closed: 180, sarFiled: 18 }
  ];

  const typologyData = [
    { name: 'Structuring', value: 28, alerts: 56 },
    { name: 'Rapid Movement', value: 22, alerts: 44 },
    { name: '3rd Party Payment', value: 18, alerts: 36 },
    { name: 'High Risk Corridor', value: 15, alerts: 30 },
    { name: 'Layering', value: 10, alerts: 20 },
    { name: 'Other', value: 7, alerts: 14 }
  ];

  const performanceData = [
    { metric: 'Avg Time to First Touch', value: '4.2 hours', trend: 'down', change: '-12%' },
    { metric: 'Avg Time to Close', value: '6.8 days', trend: 'down', change: '-8%' },
    { metric: 'False Positive Rate', value: '32%', trend: 'down', change: '-5%' },
    { metric: 'SAR Conversion Rate', value: '11%', trend: 'up', change: '+2%' },
    { metric: 'QA Pass Rate', value: '94%', trend: 'up', change: '+3%' },
    { metric: 'Aged Alerts', value: '8', trend: 'down', change: '-4' }
  ];

  const regionData = [
    { region: 'EMEA', alerts: 89, high: 34, medium: 42, low: 13 },
    { region: 'Americas', alerts: 67, high: 28, medium: 31, low: 8 },
    { region: 'APAC', alerts: 45, high: 19, medium: 20, low: 6 }
  ];

  const slaComplianceData = [
    { week: 'W1', onTime: 95, breached: 5 },
    { week: 'W2', onTime: 92, breached: 8 },
    { week: 'W3', onTime: 97, breached: 3 },
    { week: 'W4', onTime: 94, breached: 6 }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#64748b'];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-slate-900">Analytics & Reporting</h1>
        <p className="text-slate-500">Operational metrics, risk analytics, and model performance</p>
      </div>

      <Tabs defaultValue="operational">
        <TabsList>
          <TabsTrigger value="operational">Operational</TabsTrigger>
          <TabsTrigger value="risk">Risk Analytics</TabsTrigger>
          <TabsTrigger value="model">Model Performance</TabsTrigger>
          <TabsTrigger value="sla">SLA & Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="operational" className="space-y-6">
          <div className="grid grid-cols-6 gap-4">
            {performanceData.map((item, idx) => (
              <Card key={idx}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-slate-500">{item.metric}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-slate-900 mb-2">{item.value}</div>
                  <div className={`flex items-center gap-1 text-sm ${
                    item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>{item.change}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Alert Volume Trend</CardTitle>
                <p className="text-sm text-slate-500">Monthly alert generation and closure rates</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={alertVolumeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="alerts" stroke="#3b82f6" strokeWidth={2} name="Alerts Generated" />
                    <Line type="monotone" dataKey="closed" stroke="#10b981" strokeWidth={2} name="Alerts Closed" />
                    <Line type="monotone" dataKey="sarFiled" stroke="#ef4444" strokeWidth={2} name="SARs Filed" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert Distribution by Region</CardTitle>
                <p className="text-sm text-slate-500">Geographic breakdown of alert volume</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={regionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="region" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="high" stackId="a" fill="#ef4444" name="High Priority" />
                    <Bar dataKey="medium" stackId="a" fill="#f59e0b" name="Medium Priority" />
                    <Bar dataKey="low" stackId="a" fill="#64748b" name="Low Priority" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Investigator Workload</CardTitle>
              <p className="text-sm text-slate-500">Current assignment distribution</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Sarah Chen', assigned: 12, inReview: 8, closed: 45, avgTime: '5.2 days' },
                  { name: 'Marcus Rodriguez', assigned: 15, inReview: 11, closed: 38, avgTime: '6.1 days' },
                  { name: 'Emma Williams', assigned: 9, inReview: 6, closed: 52, avgTime: '4.8 days' },
                  { name: 'David Kumar', assigned: 14, inReview: 10, closed: 41, avgTime: '5.9 days' },
                  { name: 'James Park', assigned: 11, inReview: 7, closed: 36, avgTime: '6.4 days' }
                ].map((inv, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="text-slate-900">{inv.name}</div>
                      <div className="flex gap-4 mt-2 text-sm text-slate-500">
                        <span>Assigned: {inv.assigned}</span>
                        <span>In Review: {inv.inReview}</span>
                        <span>Closed (30d): {inv.closed}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-500">Avg Time</div>
                      <div className="text-slate-900">{inv.avgTime}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Typologies</CardTitle>
                <p className="text-sm text-slate-500">Alert distribution by suspicious activity type</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={typologyData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {typologyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>High-Risk Corridors</CardTitle>
                <p className="text-sm text-slate-500">Geographic flow patterns requiring attention</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { from: 'Cayman Islands', to: 'Switzerland', count: 23, amount: '€45.2M', risk: 'High' },
                    { from: 'Hong Kong', to: 'BVI', count: 18, amount: '$32.1M', risk: 'High' },
                    { from: 'UAE', to: 'Malta', count: 15, amount: '€28.5M', risk: 'Medium' },
                    { from: 'Singapore', to: 'Luxembourg', count: 12, amount: '€22.8M', risk: 'Medium' },
                    { from: 'Panama', to: 'Cyprus', count: 9, amount: '€15.3M', risk: 'High' }
                  ].map((corridor, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="text-slate-900">{corridor.from} → {corridor.to}</div>
                        <div className="text-sm text-slate-500 mt-1">
                          {corridor.count} transactions • {corridor.amount}
                        </div>
                      </div>
                      <Badge variant={corridor.risk === 'High' ? 'destructive' : 'default'}>
                        {corridor.risk} Risk
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Entity Risk Distribution</CardTitle>
              <p className="text-sm text-slate-500">Risk score breakdown across monitored entities</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { range: '0-20', count: 450 },
                  { range: '21-40', count: 380 },
                  { range: '41-60', count: 290 },
                  { range: '61-80', count: 145 },
                  { range: '81-100', count: 67 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="range" stroke="#64748b" label={{ value: 'Risk Score Range', position: 'insideBottom', offset: -5 }} />
                  <YAxis stroke="#64748b" label={{ value: 'Entity Count', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fund-Level Risk Indicators</CardTitle>
              <p className="text-sm text-slate-500">Asset management specific metrics</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { fund: 'Emerald Fund SICAV', aum: '€2.1B', redemptionVelocity: 'High', omnibusConcentration: '45%' },
                  { fund: 'Global Equity Fund', aum: '$1.8B', redemptionVelocity: 'Medium', omnibusConcentration: '32%' },
                  { fund: 'Pacific Growth Fund', aum: '$950M', redemptionVelocity: 'Low', omnibusConcentration: '18%' }
                ].map((fund, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="text-slate-900 mb-2">{fund.fund}</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">AUM</span>
                        <span className="text-slate-900">{fund.aum}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Redemption Velocity</span>
                        <Badge variant={fund.redemptionVelocity === 'High' ? 'destructive' : 'outline'}>
                          {fund.redemptionVelocity}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Omnibus Concentration</span>
                        <span className="text-slate-900">{fund.omnibusConcentration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="model" className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-slate-500">Model Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-slate-900 mb-2">87.3%</div>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>+2.1%</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-slate-500">Precision</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-slate-900 mb-2">68.4%</div>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>+5.2%</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-slate-500">Recall</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-slate-900 mb-2">91.2%</div>
                <div className="flex items-center gap-1 text-sm text-red-600">
                  <TrendingDown className="w-4 h-4" />
                  <span>-1.3%</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-slate-500">Alert Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-slate-900 mb-2">192</div>
                <div className="flex items-center gap-1 text-sm text-red-600">
                  <TrendingDown className="w-4 h-4" />
                  <span>-8</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Model Performance Over Time</CardTitle>
              <p className="text-sm text-slate-500">Tracking key metrics for deployed models</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={[
                  { month: 'May', accuracy: 85.1, precision: 63.2, recall: 92.5 },
                  { month: 'Jun', accuracy: 85.8, precision: 64.7, recall: 91.8 },
                  { month: 'Jul', accuracy: 86.2, precision: 66.1, recall: 92.1 },
                  { month: 'Aug', accuracy: 86.9, precision: 67.3, recall: 91.6 },
                  { month: 'Sep', accuracy: 87.1, precision: 67.8, recall: 91.4 },
                  { month: 'Oct', accuracy: 87.3, precision: 68.4, recall: 91.2 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" domain={[60, 95]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="accuracy" stroke="#3b82f6" strokeWidth={2} name="Accuracy %" />
                  <Line type="monotone" dataKey="precision" stroke="#10b981" strokeWidth={2} name="Precision %" />
                  <Line type="monotone" dataKey="recall" stroke="#f59e0b" strokeWidth={2} name="Recall %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Models & Scenarios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Structuring Detection v2.3', type: 'Rule-Based', status: 'Production', lastTuned: '2024-10-15', alerts: 56 },
                  { name: 'Rapid Movement ML Model', type: 'ML Supervised', status: 'Production', lastTuned: '2024-10-22', alerts: 44 },
                  { name: 'Network Anomaly Detection', type: 'Graph ML', status: 'Production', lastTuned: '2024-10-08', alerts: 32 },
                  { name: 'Omnibus Pattern Analyzer', type: 'Rule-Based', status: 'Champion', lastTuned: '2024-11-01', alerts: 28 },
                  { name: 'Cross-Border Flow Detector', type: 'Hybrid', status: 'Challenger', lastTuned: '2024-11-05', alerts: 15 }
                ].map((model, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="text-slate-900">{model.name}</div>
                        <Badge variant="outline">{model.type}</Badge>
                        <Badge variant={
                          model.status === 'Production' ? 'default' : 
                          model.status === 'Champion' ? 'secondary' : 
                          'outline'
                        }>
                          {model.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-slate-500 mt-1">
                        Last tuned: {model.lastTuned} • {model.alerts} alerts (30d)
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sla" className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-slate-500 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  On-Time Closure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-slate-900">94.2%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-slate-500 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  SLA Breaches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-slate-900">6</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-slate-500 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  Avg Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-slate-900">4.2 hrs</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-slate-500 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-purple-500" />
                  Backlog
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-slate-900">23</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Weekly SLA Compliance</CardTitle>
              <p className="text-sm text-slate-500">Tracking on-time vs. breached SLAs</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={slaComplianceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="week" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="onTime" stackId="a" fill="#10b981" name="On Time" />
                  <Bar dataKey="breached" stackId="a" fill="#ef4444" name="Breached" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SLA Breach Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { alert: 'ALT-2024-001156', entity: 'Emerald Fund SICAV', sla: '4 days', actual: '8 days', reason: 'Awaiting RFI response' },
                  { alert: 'ALT-2024-001078', entity: 'Global Distributors AG', sla: '4 days', actual: '13 days', reason: 'Complex investigation' },
                  { alert: 'ALT-2024-001012', entity: 'Northern Pension Fund', sla: '4 days', actual: '5 days', reason: 'Resource constraints' }
                ].map((breach, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-lg border-amber-200 bg-amber-50">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600">{breach.alert}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-900">{breach.entity}</span>
                      </div>
                      <div className="text-sm text-slate-600 mt-1">
                        SLA: {breach.sla} • Actual: {breach.actual} • {breach.reason}
                      </div>
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
