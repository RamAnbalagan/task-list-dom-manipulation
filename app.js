// Define UI Vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collections');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// load all event listeners

loadEventListeners ();

function loadEventListeners() {
  //DOM load event
  document.addEventListener('DOMContentLoaded',getTasks);
  //add task event
  form.addEventListener('submit',addTask);
  //remove task event
  taskList.addEventListener('click',removeTask);
  //clear task event
  clearBtn.addEventListener('click', clearAllTasks);
  //filter tasks event
  filter.addEventListener('keyup',filterTasks);
}

//Get tasks from local storage 
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach( task => {
    // create a list item
    const li = document.createElement('li');
    li.className = 'collection-item';
    //create text node and append to the li
    li.appendChild(document.createTextNode(task));

    // Create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class ="fa fa-remove"></i>';
    //append the link to li
    li.appendChild(link);
    taskList.appendChild(li);
  });
}

function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
    return;
  }

  // create a list item
  const li = document.createElement('li');
  li.className = 'collection-item';
  //create text node and append to the li
  li.appendChild(document.createTextNode(taskInput.value));

  // Create new link element
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  // add icon html
  link.innerHTML = '<i class ="fa fa-remove"></i>';
  //append the link to li
  li.appendChild(link);
  console.log(li);
  taskList.appendChild(li);
  storeTaskInLocalStorage(taskInput.value);
  //clear input
  taskInput.value = '';

  //store in local storage
  e.preventDefault();
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  console.log(task);
  tasks.push(task);

  localStorage.setItem('tasks',JSON.stringify(tasks));
}


function removeTask(e) {

  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
      let element = e.target.parentElement.parentElement;
      element.remove();


      //remove from local storage

      removeTaskFromLocalStorage(element);
    }
  }
  e.stopPropagation();
  e.preventDefault();
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach( (task,index) => {
    if(task === taskItem.textContent) {
      tasks.splice(index,1);
    }
  });

  localStorage.setItem('tasks',JSON.stringify(tasks));
}
function clearAllTasks(e) {
  // slower method 
  // taskList.innerHTML = '';
  // faster method 
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item')
          .forEach( task => {
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text)!=-1) {
              task.style.display = 'block';
            }
            else {
              task.style.display ='none';
            }
          });
}