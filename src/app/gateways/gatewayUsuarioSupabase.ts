import iGatewayUsuario from "./iGatewayUsuario";
import Usuario from "../../domain/models/usuario";
import { supabase } from "../../infra/supabaseClient";

export default class gatewayUsuarioSupabase implements iGatewayUsuario {
    async cadastrarUsuario(usuario: Usuario): Promise<Usuario> {
        const { data, error } = await supabase
            .from('usuarios')
            .insert([
                { telefone: usuario.telefone, nome: usuario.nome, senha: usuario.senha }
            ]);

        if (error) {
            throw new Error(`Erro ao cadastrar usuário: ${error.message}`);
        }

        return usuario;
    }

    async listarUsuarios(): Promise<Array<Usuario>> {
        const { data, error } = await supabase
            .from('usuarios')
            .select('*');

        if (error) {
            throw new Error(`Erro ao listar usuários: ${error.message}`);
        }

        return data.map((item: any) => new Usuario(item.telefone, item.nome, item.senha));
    }
}
