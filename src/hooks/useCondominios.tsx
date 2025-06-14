
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Condominio {
  id: string;
  nome: string;
  endereco: string;
  valor_servico: number | null;
  recebe_nota_fiscal: boolean | null;
  contrato_digital: string | null;
}

export function useCondominios() {
  const [condominios, setCondominios] = useState<Condominio[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchCondominios = async () => {
    try {
      const { data, error } = await supabase
        .from('condominios')
        .select('*')
        .order('nome');

      if (error) throw error;
      setCondominios(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar condomínios",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createCondominio = async (condominio: Omit<Condominio, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('condominios')
        .insert([condominio])
        .select()
        .single();

      if (error) throw error;

      setCondominios(prev => [...prev, data]);
      toast({
        title: "Condomínio cadastrado",
        description: "Condomínio adicionado com sucesso!",
      });
      return data;
    } catch (error: any) {
      toast({
        title: "Erro ao cadastrar condomínio",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateCondominio = async (id: string, condominio: Partial<Condominio>) => {
    try {
      const { data, error } = await supabase
        .from('condominios')
        .update(condominio)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setCondominios(prev => prev.map(c => c.id === id ? data : c));
      toast({
        title: "Condomínio atualizado",
        description: "Dados atualizados com sucesso!",
      });
      return data;
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar condomínio",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteCondominio = async (id: string) => {
    try {
      const { error } = await supabase
        .from('condominios')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setCondominios(prev => prev.filter(c => c.id !== id));
      toast({
        title: "Condomínio removido",
        description: "Condomínio removido com sucesso!",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao remover condomínio",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchCondominios();
  }, []);

  return {
    condominios,
    loading,
    createCondominio,
    updateCondominio,
    deleteCondominio,
    refetch: fetchCondominios,
  };
}
