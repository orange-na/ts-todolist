import ListTask from "../models/ListTask.js";
import { validate } from "../helpers/validation.js";
import TodoList from "./TodoList.js";
import ListTemplate from "./ListTemplate.js";

export default class App {
  // Get instances of TodoList and ListTemplate
  todoList = TodoList.instance;
  listTemplate = ListTemplate.instance;

  constructor() {
    const itemEntryForm = document.getElementById(
      "itemEntryForm"
    ) as HTMLFormElement;
    itemEntryForm.addEventListener("submit", this.onFormSubmit.bind(this));

    const clearItemsButton = document.getElementById(
      "clearItemsButton"
    ) as HTMLButtonElement;
    clearItemsButton.addEventListener(
      "click",
      this.onClearButtonClick.bind(this)
    );
  }

  private onFormSubmit(event: Event): void {
    event.preventDefault();

    const input = document.getElementById("newItem") as HTMLInputElement;
    const newEntryText: string = input.value;

    if (!validate({ value: newEntryText, required: true })) {
      alert("Please enter a task.");
      return;
    }
    // calculate item ID
    const itemId: number = this.todoList.list.length
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

  private onClearButtonClick(): void {
    this.todoList.clearList();
    this.listTemplate.clear();
  }

  render(): void {
    //clear the DOM
    this.listTemplate.clear();
    // Load initial data from local storage
    this.todoList.display();
    // Initial render of the template

    this.listTemplate.render(this.todoList);
  }
}
