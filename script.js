// Seleciona os elementos do DOM que serão utilizados
const formEl = document.querySelector("#form");
const todoInputEl = document.querySelector("#todo-input");
const todosEl = document.querySelector("#todos");

// Cria uma lista vazia que irá armazenar as tarefas
let todosList = [];

// Verifica se já existe uma lista de tarefas armazenada no localStorage e, caso exista, carrega essa lista para a variável todosList
const todosListFromLocalStorage = JSON.parse(localStorage.getItem("todosList"));
if (todosListFromLocalStorage) {
  todosList = todosListFromLocalStorage;

  // Para cada tarefa na lista, cria um elemento na interface, adiciona os event listeners de clique nos botões de check e delete, e adiciona o elemento à lista de tarefas na interface
  todosList.forEach((todo, index) => {
    const todoItemEl = createTodoItemElement(todo);
    todosEl.appendChild(todoItemEl);

    // Adiciona o event listener de clique no botão de check para marcar a tarefa como completa ou incompleta
    const checkBtnEl = todoItemEl.querySelector(".checks");
    checkBtnEl.addEventListener("click", () => {
      toggleTodoComplete(todoItemEl);
      saveTodosListToLocalStorage();
    });

    // Adiciona o event listener de clique no botão de delete para remover a tarefa da lista
    const deleteBtnEl = todoItemEl.querySelector(".deletes");
    deleteBtnEl.addEventListener("click", () => {
      removeTodoItem(todoItemEl, index);
      saveTodosListToLocalStorage();
    });
  });
}

// Adiciona um event listener de submit no formulário para adicionar uma nova tarefa
formEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  const todoText = todoInputEl.value;

  // Adiciona a nova tarefa à lista de tarefas e limpa o input de texto
  todosList.push(todoText);
  todoInputEl.value = "";

  // Cria um elemento na interface para a nova tarefa, adiciona os event listeners de clique nos botões de check e delete, e adiciona o elemento à lista de tarefas na interface
  const todoItemEl = createTodoItemElement(todoText);
  todosEl.appendChild(todoItemEl);

  // Adiciona o event listener de clique no botão de check para marcar a tarefa como completa ou incompleta
  const checkBtnEl = todoItemEl.querySelector(".checks");
  checkBtnEl.addEventListener("click", () => {
    toggleTodoComplete(todoItemEl);
    saveTodosListToLocalStorage();
  });

  // Adiciona o event listener de clique no botão de delete para remover a tarefa da lista
  const deleteBtnEl = todoItemEl.querySelector(".deletes");
  deleteBtnEl.addEventListener("click", () => {
    removeTodoItem(todoItemEl, todosList.indexOf(todoText));
    saveTodosListToLocalStorage();
  });

  // Salva a lista atualizada no localStorage
  saveTodosListToLocalStorage();
});

// Função que cria um elemento na interface para uma tarefa
function createTodoItemElement(todo) {
  const liEl = document.createElement("li");
  liEl.innerHTML = `
    <span>${todo}</span>
    <div class="actions">
      <button class="checks"><i class="fa-solid fa-check check"></i></button>
      <button class="deletes"><i class="fa-solid fa-trash trash"></i></button>
    </div>
  `;
  return liEl;
}

// Função que marca a tarefa como completa ou incompleta
function toggleTodoComplete(todoItemEl) {
  todoItemEl.classList.toggle("todo-complete");
}

// Função que remove a tarefa da lista e da interface
function removeTodoItem(todoItemEl, index) {
  todosList.splice(index, 1);
  todosEl.removeChild(todoItemEl);
}

// Função que salva a lista de tarefas atual no localStorage
function saveTodosListToLocalStorage() {
  localStorage.setItem("todosList", JSON.stringify(todosList));
}

let usuario = { nome: "João", idade: 35 };
let str_usuario = JSON.stringify(usuario);

console.log(str_usuario);

let obj_usuario = JSON.parse(str_usuario);

console.log(obj_usuario);
