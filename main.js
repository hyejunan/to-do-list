// getting all required elements
const inputBox = document.querySelector(".todo__input input");
const addBtn = document.querySelector(".todo__input button");
const todoList = document.querySelector(".todo__list");
const deleteAllBtn = document.querySelector(".todo__footer button");
inputBox.onkeyup = () => {
    let userData = inputBox.value; // getting user entered value
    if(userData.trim() != 0) { // if user values aren't only spaces
        addBtn.classList.add("active"); // active the add button
    } else {
        addBtn.classList.remove("active"); // remove the add button
    }
}

showTasks();

// if user click on the add button
addBtn.onclick = () => {
    let userData = inputBox.value; // getting user entered value
    let getLocalStorage = localStorage.getItem("New Todo"); // getting localstorage
    if (getLocalStorage == null) { // if localStorage is null
        listArr = []; // creating blank array
    } else {
        listArr = JSON.parse(getLocalStorage); // transforming json string into a js object
    }
    listArr.push(userData); // pushing or adding user data
    localStorage.setItem("New Todo", JSON.stringify(listArr)); // transforming js object into a json string
    showTasks(); // calling showTasks function
}

// function to add task list inside ul
function showTasks() {
    let getLocalStorage = localStorage.getItem("New Todo"); // getting localstorage
    if (getLocalStorage == null) { // if localStorage is null
        listArr = []; // creating blank array
    } else {
        listArr = JSON.parse(getLocalStorage); // transforming json string into a js object
    }
    const todoNum = document.querySelector(".todo__num");
    todoNum.textContent = listArr.length; // passing the length of the array
    if(listArr.length > 0) { 
        deleteAllBtn.classList.add("active"); // active the add button
    } else {
        deleteAllBtn.classList.remove("active"); // remove the add button
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li>${element}<span onclick="deleteTask(${index})"; ><i class="fas fa-trash"></i></span> </li>`;
    });
    todoList.innerHTML = newLiTag; // adding new li tag inside ul tag
    inputBox.value = ""; // once task added leave the input field black
    addBtn.classList.remove("active");
}

// delete task function
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); // delete or remove the particular indexed li
    // after remove the li again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}

// delete all tasks function
deleteAllBtn.onclick = () => {
    listArr = [];
    // after delete all tasks, again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}