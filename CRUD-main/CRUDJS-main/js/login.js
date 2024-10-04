// Função para lidar com o evento de submissão do formulário
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    // Pega os valores dos campos do formulário
    const userType = document.getElementById('userType').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Cria um objeto com as informações do login
    const loginData = {
        userType,
        email,
        password
    };

    try {
        // Faz a requisição para a API de login
        const response = await fetch('http://179.124.140.113/api/login', { 

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        // Verifica se a resposta foi bem-sucedida
        if (response.ok) {
            const data = await response.json();
            // Redireciona o usuário para a página específica de acordo com o tipo
            if (data.success) {
                if (userType === 'coordenador') {
                    window.location.href = 'dashboard-coordenador.html';
                } else if (userType === 'professor') {
                    window.location.href = 'dashboard-professor.html';
                } else if (userType === 'aluno') {
                    window.location.href = 'dashboard-aluno.html';
                }
            } else {
                alert('Credenciais inválidas. Tente novamente.');
            }
        } else {
            alert('Erro no servidor. Tente novamente mais tarde.');
        }
    } catch (error) {
        console.error('Erro durante o login:', error);
        alert('Erro na conexão. Verifique sua rede e tente novamente.');
    }
});
