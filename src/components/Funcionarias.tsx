
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Edit, Eye, Phone, MapPin, Clock, DollarSign } from "lucide-react";

interface Funcionaria {
  id: string;
  nome: string;
  cpf: string;
  telefone: string;
  endereco: string;
  jornadaDias: string[];
  horasSemanais: number;
  salarioBase: number;
  valorPassagem: number;
  status: 'ativa' | 'inativa';
}

export function Funcionarias() {
  const [funcionarias, setFuncionarias] = useState<Funcionaria[]>([
    {
      id: '1',
      nome: 'Maria Silva Santos',
      cpf: '123.456.789-00',
      telefone: '(11) 98765-4321',
      endereco: 'Rua das Flores, 123 - Vila Nova',
      jornadaDias: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
      horasSemanais: 40,
      salarioBase: 1500.00,
      valorPassagem: 4.50,
      status: 'ativa'
    },
    {
      id: '2',
      nome: 'Ana Paula Costa',
      cpf: '987.654.321-00',
      telefone: '(11) 91234-5678',
      endereco: 'Av. Central, 456 - Centro',
      jornadaDias: ['Segunda', 'Quarta', 'Sexta'],
      horasSemanais: 24,
      salarioBase: 900.00,
      valorPassagem: 4.50,
      status: 'ativa'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFuncionaria, setEditingFuncionaria] = useState<Funcionaria | null>(null);

  const handleEdit = (funcionaria: Funcionaria) => {
    setEditingFuncionaria(funcionaria);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingFuncionaria(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            Funcionárias
          </h1>
          <p className="text-muted-foreground">Gerencie suas funcionárias e suas informações</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew} className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Nova Funcionária
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingFuncionaria ? 'Editar Funcionária' : 'Nova Funcionária'}
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input id="nome" placeholder="Digite o nome completo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input id="cpf" placeholder="000.000.000-00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" placeholder="(11) 99999-9999" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="horas">Horas Semanais</Label>
                <Input id="horas" type="number" placeholder="40" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Input id="endereco" placeholder="Rua, número - Bairro" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salario">Salário Base</Label>
                <Input id="salario" type="number" step="0.01" placeholder="1500.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passagem">Valor da Passagem</Label>
                <Input id="passagem" type="number" step="0.01" placeholder="4.50" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                {editingFuncionaria ? 'Salvar Alterações' : 'Cadastrar Funcionária'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {funcionarias.map((funcionaria) => (
          <Card key={funcionaria.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg text-foreground">{funcionaria.nome}</CardTitle>
                  <p className="text-sm text-muted-foreground">{funcionaria.cpf}</p>
                </div>
                <Badge variant={funcionaria.status === 'ativa' ? 'default' : 'secondary'} className="bg-secondary text-secondary-foreground">
                  {funcionaria.status === 'ativa' ? 'Ativa' : 'Inativa'}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Telefone:</span>
                  <span className="font-medium">{funcionaria.telefone}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Endereço:</span>
                  <span className="font-medium text-xs">{funcionaria.endereco}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Jornada:</span>
                  <span className="font-medium">{funcionaria.horasSemanais}h/semana</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Salário:</span>
                  <span className="font-medium">R$ {funcionaria.salarioBase.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Dias de trabalho:</p>
                <div className="flex flex-wrap gap-1">
                  {funcionaria.jornadaDias.map((dia) => (
                    <Badge key={dia} variant="outline" className="text-xs">
                      {dia}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleEdit(funcionaria)}
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

      {funcionarias.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Nenhuma funcionária cadastrada</h3>
            <p className="text-muted-foreground mb-4">Comece adicionando sua primeira funcionária ao sistema</p>
            <Button onClick={handleAddNew} className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Primeira Funcionária
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
