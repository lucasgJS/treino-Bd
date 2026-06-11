// 1. Configuração de acesso (Suas credenciais corretas e limpas!)
const SUPABASE_URL = "https://ntonstfxbhkfmkauqcyc.supabase.co";
const SUPABASE_KEY = "sb_publishable_biCX3XCyQ7VZez4Ljw_uWQ_Aigmo15e";

const conexaoBanco = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. Escuta o envio do formulário de login
document.getElementById('form-login').addEventListener('submit', async function(evento) {
    evento.preventDefault(); // Impede a página de recarregar

    // 3. Pega o email e senha digitados na tela de login
    const emailDigitado = document.getElementById('email').value;
    const senhaDigitada = document.getElementById('senha').value;

    // 4. Faz a busca na tabela 'clientes_lanchonete'
    // Traduzindo: "Selecione tudo da tabela onde o email seja igual ao digitado E a senha seja igual à digitada"
    const { data: usuarioEncontrado, error } = await conexaoBanco
        .from('clientes_lanchonete')
        .select('*')
        .eq('email', emailDigitado)
        .eq('senha', senhaDigitada);

    if (error) {
        alert("Erro ao tentar fazer login: " + error.message);
        return;
    }

    // 5. Verifica se o banco encontrou alguém
    // Se o tamanho (length) da lista for maior que 0, significa que achou!
    if (usuarioEncontrado.length > 0) {
        alert(`Bem-vindo de volta à Bella Massa, ${usuarioEncontrado[0].nome}!`);
        
        // Aqui você pode redirecionar para a página do cardápio/home se quiser
        // window.location.href = "home.html"; 
    } else {
        // Se a lista veio vazia, é porque o e-mail ou a senha estão errados
        alert("E-mail ou senha incorretos! Tente novamente.");
    }
});