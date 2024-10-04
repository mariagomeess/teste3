// Função para exibir o modal de confirmação de exclusão
function confirmDelete() {
    document.getElementById('confirmModal').style.display = 'block';
}

// Função para fechar o modal de confirmação de exclusão
function closeModal() {
    document.getElementById('confirmModal').style.display = 'none';
}

// Função para deletar o item (coordenador)
async function deleteItem(coordinatorId) {
    try {
        const response = await fetch(`http://179.124.140.113/api/coordenadores/${coordinatorId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Coordenador deletado com sucesso.');
            fetchCoordinators(); // Atualiza a lista de coordenadores
        } else {
            alert('Erro ao deletar coordenador.');
        }
    } catch (error) {
        console.error('Erro ao deletar coordenador:', error);
    } finally {
        closeModal(); // Fecha o modal após a ação
    }
}

// Função para buscar e exibir os coordenadores cadastrados
async function fetchCoordinators() {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/coordenadores');
        if (!response.ok) {
            throw new Error('Erro ao buscar coordenadores');
        }
        const coordinators = await response.json();
        const cardList = document.querySelector('.card-list');
        cardList.innerHTML = ''; // Limpa a lista antes de atualizá-la

        // Itera sobre os coordenadores e cria os cards
        coordinators.forEach(coordinator => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <div class="info">
                    <h2>${coordinator.name}</h2>
                    <p>${coordinator.email}</p>
                    <p>${coordinator.matricula}</p>
                    <p>${coordinator.phone}</p>
                </div>
                <div class="actions">
                    <button class="edit-button" onclick="editCoordinator('${coordinator.id}')">
                        <img src="edit-icon.png" alt="Editar">
                    </button>
                    <button class="delete-button" onclick="confirmDelete(${coordinator.id})">
                        <img src="delete-icon.png" alt="Excluir">
                    </button>
                </div>
            `;
            cardList.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao carregar coordenadores:', error);
    }
}

// Função para editar um coordenador
function editCoordinator(coordinatorId) {
    window.location.href = `cadastro.html?id=${coordinatorId}`; // Redireciona para a página de edição com o ID do coordenador
}

// Carrega os coordenadores ao iniciar a página
fetchCoordinators();

// Lógica da barra de pesquisa
document.querySelector('.search-bar input').addEventListener('input', function(event) {
    const searchTerm = event.target.value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const name = card.querySelector('h2').textContent.toLowerCase();
        if (name.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});
