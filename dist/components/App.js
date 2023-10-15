import ListTask from "../models/ListTask.js";
import { validate } from "../helpers/validation.js";
import TodoList from "./TodoList.js";
import ListTemplate from "./ListTemplate.js";
export default class App {
    constructor() {
        // Get instances of TodoList and ListTemplate
        this.todoList = TodoList.instance;
        this.listTemplate = ListTemplate.instance;
        const itemEntryForm = document.getElementById("itemEntryForm");
        itemEntryForm.addEventListener("submit", this.onFormSubmit.bind(this));
        const clearItemsButton = document.getElementById("clearItemsButton");
        clearItemsButton.addEventListener("click", this.onClearButtonClick.bind(this));
    }
    onFormSubmit(event) {
        event.preventDefault();
        const input = document.getElementById("newItem");
        const newEntryText = input.value;
        if (!validate({ value: newEntryText, required: true })) {
            alert("Please enter a task.");
            return;
        }
        // calculate item ID
        const itemId = this.todoList.list.length
            ? parseInt(this.todoList.list[this.todoList.list.length - 1].id) + 1
            : 1;
        // Create a new item using ListTask class
        const newItem = new ListTask(itemId.toString(), newEntryText);
        // Add the new item to the todo list
        this.todoList.addNew(newItem);
        // Re-render the list with the new item included
        this.listTemplate.render(this.todoList);
        // Reset the form input after submission
        input.value = "";
    }
    onClearButtonClick() {
        this.todoList.clearList();
        this.listTemplate.clear();
    }
    render() {
        //clear the DOM
        this.listTemplate.clear();
        // Load initial data from local storage
        this.todoList.display();
        // Initial render of the template
        this.listTemplate.render(this.todoList);
    }
}
