'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields() 
    document.getElementById('modal').classList.remove('active')
}

// LocalStorage
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_user')) ?? []
const setLocalStorage = (dbUser) => localStorage.setItem("db_user", JSON.stringify(dbUser))

// CRUD
const deleteUser = (index) => {
    const dbUser = readUser()
    dbUser.splice(index, 1)
    setLocalStorage(dbUser)
}

const updateUser = (index, user) => {
    const dbUser = readUser()
    dbUser[index] = user
    setLocalStorage(dbUser)
}

const readUser = () => getLocalStorage()

const createUser = (user) => {
    const dbUser = getLocalStorage()
    dbUser.push(user)
    setLocalStorage(dbUser)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

// Interação com o layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('nome').dataset.index = 'new'
    document.querySelector(".modal-header>h2").textContent  = 'Novo Usuário'
}

const saveUser = () => {
    if (isValidFields()) {
        const user = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            disciplina: document.getElementById('disciplina').value
        }
        
        const index = document.getElementById('nome').dataset.index;
        
        // Verifica se o index é 'new' para criar um novo ou editar o existente
        if (index === 'new') {
            createUser(user);
        } else {
            updateUser(index, user);
        }
        
        updateTable();
        closeModal();
    }
}

const createRow = (user, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${user.nome}</td>
        <td>${user.email}</td>
        <td>${user.celular}</td>
        <td>${user.disciplina}</td>

        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `
    document.querySelector('#tableUser>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableUser>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbUser = readUser()
    clearTable()
    dbUser.forEach(createRow)
}

const fillFields = (user) => {
    document.getElementById('nome').value = user.nome
    document.getElementById('email').value = user.email
    document.getElementById('celular').value = user.celular
    document.getElementById('disciplina').value = user.disciplina
}

const editUser = (index) => {
    const user = readUser()[index];
    user.index = index;
    fillFields(user);
    
    // Atualiza o index no dataset para permitir a edição
    document.getElementById('nome').dataset.index = index;

    document.querySelector(".modal-header>h2").textContent = `Editando ${user.nome}`;
    openModal();
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editUser(index)
        } else {
            const user = readUser()[index]
            const response = confirm(`Deseja realmente excluir o usuário ${user.nome}?`)
            if (response) {
                deleteUser(index)
                updateTable()
            }
        }
    }
}

updateTable()

// Eventos
document.getElementById('cadastrarUsuario')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveUser)

document.querySelector('#tableUser>tbody')
    .addEventListener('click', editDelete)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)
