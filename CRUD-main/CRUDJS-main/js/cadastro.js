// Função para enviar o formulário de cadastro de usuário
document.getElementById('userForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    // Coleta os dados do formulário
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const permissions = document.getElementById('permissions').value.split(',');

    // Monta o objeto de dados para enviar ao backend
    const userData = {
        username,
        email,
        password,
        role,
        permissions
    };

    try {
        // Envia os dados para o backend (API)
        const response = await fetch('http://179.124.140.113/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            alert('Usuário cadastrado com sucesso!');
            document.getElementById('userForm').reset(); // Limpa o formulário
            fetchUsers(); // Atualiza a lista de usuários
        } else {
            const errorData = await response.json();
            alert('Erro ao salvar usuário: ' + errorData.message);
        }
    } catch (error) {
        console.error('Erro ao conectar com a API:', error);
        alert('Erro ao salvar usuário, tente novamente mais tarde.');
    }
});

// Função para buscar e listar os usuários cadastrados
async function fetchUsers() {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/usuarios');
        if (!response.ok) {
            throw new Error('Erro ao buscar usuários');
        }
        const users = await response.json();
        const list = document.getElementById('users-list');
        list.innerHTML = ''; // Limpa a lista antes de atualizar

        // Gera o HTML para exibir a lista de usuários
        users.forEach(user => {
            const item = document.createElement('div');
            item.innerHTML = `
                <h3>${user.username}</h3>
                <p>Email: ${user.email}</p>
                <p>Tipo de Usuário: ${user.role}</p>
                <p>Permissões: ${user.permissions.join(', ')}</p>
            `;
            list.appendChild(item);
        });
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
    }
}

// Função para cancelar (limpar o formulário)
function cancel() {
    document.getElementById('userForm').reset();
}

// Carrega a lista de usuários ao iniciar a página
fetchUsers();
