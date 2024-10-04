// Adiciona eventos aos botões de cada seção para redirecionar para as páginas correspondentes
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os botões dentro dos cards
    const buttons = document.querySelectorAll('.section-card button');

    // Define as rotas para cada seção
    const routes = {
        'Gerenciamento de Usuários': 'gerenciamento-usuarios.html',
        'Gerenciamento Acadêmico': 'gerenciamento-academico.html',
        'Comunicados': 'comunicados.html'
    };

    // Adiciona o evento de clique a cada botão
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const sectionTitle = event.target.previousElementSibling.textContent; // Pega o título da seção (h2)
            const route = routes[sectionTitle]; // Pega a rota correspondente ao título
            if (route) {
                window.location.href = route; // Redireciona para a página correspondente
            }
        });
    });
});
