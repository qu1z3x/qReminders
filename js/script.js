// находим формы на странице через id, ищет внутри документа
const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

let tasks = []; // все задачи пользователя на сайте

if (localStorage.getItem("tasks")) {
  // Если есть какие либо данные в локальном хранилище, то это всё приравнивается к tasks маасиву
  tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach((task) => renderTask(task)); // foreach - проходит каждый элемент объекта, здесь массива, и для каждого элемента применяет весь функционал
}

form.addEventListener("submit", addTask);
tasksList.addEventListener("click", deleteTask);
tasksList.addEventListener("click", doneTask);

// функции

function addTask(event) {
  // отключает отправку формы на обновление страницы
  event.preventDefault();
  // достаем текст из ввода
  const taskText = taskInput.value;

  const newTask = {
    // создаем задачу в виде объекта
    id: Date.now(), // название - время создания зачачи в миллесек
    text: taskText,
    done: false,
  };

  tasks.push(newTask); // push - добавляет элемент-объект в конец массива

  renderTask(newTask); // добавляем задачу на страницу

  taskInput.value = ""; // текст задачи пуст (очищен)

  taskInput.focus(); // поле ввода всегда будет активно

  if (tasksList.children.length > 1) {
    // провeряет сколько всего заметок
    emptyList.classList.add("none"); // добавление класса css "none" к тегу emptyList
  }
  saveToLocalStorage();
}

function deleteTask(event) {
  if (event.target.dataset.action !== "delete") return 0; // если точно не тег delete то функция возвращает ноль

  const parentNode = event.target.closest("li"); // ищет по родительским тегам либо классам в данном случае это сама задача под тегом li

  const id = Number(parentNode.id); // определяем id-время задачи (task.id)

  tasks = tasks.filter((task) => task.id !== id); // удаляем задачу по id из самого массива с помощью авто фильтрации массива, параметром filter

  parentNode.remove();

  if (tasksList.children.length === 1) {
    // один элемент, это как раз сама картинка "Список дел пуст"
    emptyList.classList.remove("none"); // удаление класса сss "none"
  }
  saveToLocalStorage();
}

function doneTask() {
  if (event.target.dataset.action === "done") {
    const parentNode = event.target.closest(".list-group-item");

    const id = Number(parentNode.id);

    const task = tasks.find((task) => task.id === id); // task - задача

    task.done = !task.done; // не допускают повторной записи готовой задачи в массив при повторном нажатии галочки

    const taskTitle = parentNode.querySelector(".task-title");
    taskTitle.classList.toggle("task-title--done");
  }
  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTask(task) {
  // формируем новый сss параметр для тега
  const cssClass = task.done ? "task-title task-title--done" : "task-title"; // const ... = условие ? действие при - true : действие при - false

  // создание новой разметки в HTML для каждого пункта
  const taskHTML = `
       <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
       <span class="${cssClass}">${task.text}</span>
       <div class="task-item__buttons">
         <button type="button" data-action="done" class="btn-action">
           <img src="./img/tick.svg" alt="Done" width="18" height="18">
         </button>
         <button type="button" data-action="delete" class="btn-action">
           <img src="./img/cross.svg" alt="Done" width="18" height="18">
         </button>
       </div>
     </li>`;

  // добавление задачи на страницу, вставить верхний фрагмент в сам код
  tasksList.insertAdjacentHTML("beforeend", taskHTML); // beforeend - добавление колда в самый конец, taskHTML - фрагмент кода
}

// случайные предложения для задачи в поле ввода...
var inputAreaText = [
  "Сделать зарядку",
  "Прочитать книгу",
  "Сходить в спортзал",
  "Написать письмо другу",
  "Записаться на курс",
  "Сделать покупки",
  "Выучить новое слово",
  "Посмотреть интересный фильм",
  "Сделать уборку в комнате",
  "Приготовить вкусный обед",
];
