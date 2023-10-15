import TodoList from "./TodoList.js";

interface DOMDisplay {
  ul: HTMLUListElement;
  clear(): void;
  render(todoList: TodoList): void;
}

export default class ListTemplate implements DOMDisplay {
  ul: HTMLUListElement;

  static instance: ListTemplate = new ListTemplate();
  private constructor() {
    this.ul = document.getElementById("listItem") as HTMLUListElement;
  }

  clear(): void {
    this.ul.innerHTML = "";
  }

  render(todoList: TodoList): void {
    todoList.list.forEach((item) => {
      const li = document.createElement("li") as HTMLLIElement;
      li.className = "item";

      const check = document.createElement("input") as HTMLInputElement;
      check.type = "checkbox";
      check.id = item.id;
      check.checked = item.checked;

      check.addEventListener("change", () => {
        item.checked = !item.checked;
        todoList.saveToLocalStorage();
      });

      const label = document.createElement("label") as HTMLLabelElement;
      label.htmlFor = item.id;
      label.textContent = item.task;

      const btn = document.createElement("button") as HTMLButtonElement;
      btn.className = "btn";
      btn.textContent = "X";

      btn.addEventListener("click", () => {
        todoList.removeTask(item.id);
        this.render(todoList);
      });

      li.append(check, label, btn);
      this.ul.append(li);
    });
  }
}
