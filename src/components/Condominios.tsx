
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Building2, Plus, Edit, Eye, MapPin, DollarSign, FileText } from "lucide-react";

interface Condominio {
  id: string;
  nome: string;
  endereco: string;
  valorMensal: number;
  recebeNotaFiscal: boolean;
  contratoUrl?: string;
  status: 'ativo' | 'inativo';
}

export function Condominios() {
  const [condominios, setCondominios] = useState<Condominio[]>([
    {
      id: '1',
      nome: 'Residencial Primavera',
      endereco: 'Rua das Palmeiras, 100 - Jardim Primavera',
      valorMensal: 2500.00,
      recebeNotaFiscal: true,
      contratoUrl: 'contrato-primavera.pdf',
      status: 'ativo'
    },
    {
      id: '2',
      nome: 'Edifício Central Plaza',
      endereco: 'Av. Paulista, 1500 - Centro',
      valorMensal: 4200.00,
      recebeNotaFiscal: false,
      status: 'ativo'
    },
    {
      id: '3',
      nome: 'Condomínio Vila Rica',
      endereco: 'Rua dos Lírios, 250 - Vila Rica',
      valorMensal: 1800.00,
      recebeNotaFiscal: true,
      contratoUrl: 'contrato-vila-rica.pdf',
      status: 'ativo'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCondominio, setEditingCondominio] = useState<Condominio | null>(null);

  const handleEdit = (condominio: Condominio) => {
    setEditingCondominio(condominio);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingCondominio(null);
    setIsDialogOpen(true);
  };

  const totalValorMensal = condominios
    .filter(c => c.status === 'ativo')
    .reduce((sum, c) => sum + c.valorMensal, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Building2 className="h-8 w-8 text-primary" />
            Condomínios
          </h1>
          <p className="text-muted-foreground">Gerencie os condomínios atendidos pela conservadora</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew} className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Novo Condomínio
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingCondominio ? 'Editar Condomínio' : 'Novo Condomínio'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Condomínio</Label>
                <Input id="nome" placeholder="Digite o nome do condomínio" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço Completo</Label>
                <Input id="endereco" placeholder="Rua, número - Bairro - CEP" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="valor">Valor Mensal (R$)</Label>
                <Input id="valor" type="number" step="0.01" placeholder="2500.00" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="nota-fiscal" />
                <Label htmlFor="nota-fiscal">Recebe Nota Fiscal</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contrato">Upload do Contrato</Label>
                <Input id="contrato" type="file" accept=".pdf,.doc,.docx" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                {editingCondominio ? 'Salvar Alterações' : 'Cadastrar Condomínio'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Resumo Financeiro */}
      <Card className="border-l-4 border-l-secondary">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Receita Mensal Total</p>
              <p className="text-3xl font-bold text-secondary">
                R$ {totalValorMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Condomínios Ativos</p>
              <p className="text-2xl font-bold text-primary">
                {condominios.filter(c => c.status === 'ativo').length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {condominios.map((condominio) => (
          <Card key={condominio.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg text-foreground">{condominio.nome}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={condominio.status === 'ativo' ? 'default' : 'secondary'} className="bg-secondary text-secondary-foreground">
                      {condominio.status === 'ativo' ? 'Ativo' : 'Inativo'}
                    </Badge>
                    {condominio.recebeNotaFiscal && (
                      <Badge variant="outline" className="text-xs">
                        Nota Fiscal
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <span className="text-muted-foreground block">Endereço:</span>
                    <span className="font-medium text-xs leading-relaxed">{condominio.endereco}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Valor Mensal:</span>
                  <span className="font-bold text-secondary">
                    R$ {condominio.valorMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                {condominio.contratoUrl && (
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Contrato:</span>
                    <Button variant="link" className="h-auto p-0 text-xs text-primary">
                      Ver documento
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleEdit(condominio)}
                  className="flex-1"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Editar
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-3 h-3 mr-1" />
                  Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {condominios.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Nenhum condomínio cadastrado</h3>
            <p className="text-muted-foreground mb-4">Comece adicionando o primeiro condomínio ao sistema</p>
            <Button onClick={handleAddNew} className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Primeiro Condomínio
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
