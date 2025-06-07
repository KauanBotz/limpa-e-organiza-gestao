
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Dashboard } from "@/components/Dashboard";
import { Funcionarias } from "@/components/Funcionarias";
import { Condominios } from "@/components/Condominios";
import { Card, CardContent } from "@/components/ui/card";
import { Building2 } from "lucide-react";

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'funcionarias':
        return <Funcionarias />;
      case 'condominios':
        return <Condominios />;
      case 'escalas':
        return <ComingSoon title="Escalas de Trabalho" />;
      case 'faltas':
        return <ComingSoon title="Registro de Faltas" />;
      case 'relatorios':
        return <ComingSoon title="Relatórios" />;
      case 'documentos':
        return <ComingSoon title="Gestão de Documentos" />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white">
        <AppSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="flex-1 overflow-hidden">
          <div className="p-6 bg-white border-b border-border">
            <SidebarTrigger className="mb-4" />
          </div>
          <div className="p-6 overflow-y-auto h-[calc(100vh-100px)]">
            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

// Componente temporário para seções em desenvolvimento
const ComingSoon = ({ title }: { title: string }) => (
  <div className="space-y-8 animate-fade-in">
    <div>
      <h1 className="text-3xl font-bold text-foreground">{title}</h1>
      <p className="text-muted-foreground">Esta funcionalidade estará disponível em breve</p>
    </div>
    <Card className="text-center py-20">
      <CardContent>
        <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
        <h3 className="text-xl font-medium text-foreground mb-3">Em Desenvolvimento</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Estamos trabalhando para trazer esta funcionalidade para você. 
          Enquanto isso, explore as outras seções do sistema.
        </p>
      </CardContent>
    </Card>
  </div>
);

export default Index;
