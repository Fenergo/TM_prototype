import { useState } from 'react';
import { AlertQueue } from './components/AlertQueue';
import { InvestigationWorkspace } from './components/InvestigationWorkspace';
import { CaseManagement } from './components/CaseManagement';
import { Analytics } from './components/Analytics';
import { RFIManager } from './components/RFIManager';
import { QualityAssurance } from './components/QualityAssurance';
import { TuningLab } from './components/TuningLab';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from './components/ui/sidebar';
import { Bell, BarChart3, FileSearch, Inbox, Mail, Target, Settings, Shield } from 'lucide-react';
import fenergoLogo from './assets/fen_logo.svg.png';

type View = 'alerts' | 'investigation' | 'cases' | 'analytics' | 'rfi' | 'qa' | 'tuning';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('alerts');
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);

  const handleAlertClick = (alertId: string, entityId: string) => {
    setSelectedAlertId(alertId);
    setSelectedEntityId(entityId);
    setCurrentView('investigation');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50">
        <Sidebar className="w-48">
          <SidebarContent>
            <div className="p-4 border-b flex flex-col items-center gap-2">
              <img src={fenergoLogo} alt="Fenergo" className="h-8" />
              <h1 className="text-slate-900 text-sm font-semibold">TM Platform</h1>
            </div>
            
            <SidebarGroup>
              <SidebarGroupLabel>Core Workflow</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      onClick={() => setCurrentView('alerts')}
                      isActive={currentView === 'alerts'}
                    >
                      <Inbox className="w-4 h-4" />
                      <span>Alert Queue</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      onClick={() => setCurrentView('investigation')}
                      isActive={currentView === 'investigation'}
                    >
                      <FileSearch className="w-4 h-4" />
                      <span>Investigation</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      onClick={() => setCurrentView('cases')}
                      isActive={currentView === 'cases'}
                    >
                      <Bell className="w-4 h-4" />
                      <span>Case Management</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Operations</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      onClick={() => setCurrentView('rfi')}
                      isActive={currentView === 'rfi'}
                    >
                      <Mail className="w-4 h-4" />
                      <span>RFI Manager</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      onClick={() => setCurrentView('qa')}
                      isActive={currentView === 'qa'}
                    >
                      <Shield className="w-4 h-4" />
                      <span>Quality Assurance</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Analytics & Tuning</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      onClick={() => setCurrentView('analytics')}
                      isActive={currentView === 'analytics'}
                    >
                      <BarChart3 className="w-4 h-4" />
                      <span>Analytics</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      onClick={() => setCurrentView('tuning')}
                      isActive={currentView === 'tuning'}
                    >
                      <Target className="w-4 h-4" />
                      <span>Tuning Lab</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 overflow-auto">
          {currentView === 'alerts' && <AlertQueue onAlertClick={handleAlertClick} />}
          {currentView === 'investigation' && (
            <InvestigationWorkspace 
              alertId={selectedAlertId} 
              entityId={selectedEntityId}
            />
          )}
          {currentView === 'cases' && <CaseManagement />}
          {currentView === 'analytics' && <Analytics />}
          {currentView === 'rfi' && <RFIManager />}
          {currentView === 'qa' && <QualityAssurance />}
          {currentView === 'tuning' && <TuningLab />}
        </main>
      </div>
    </SidebarProvider>
  );
}
