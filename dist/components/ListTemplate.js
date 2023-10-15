class ListTemplate {
    constructor() {
        this.ul = document.getElementById("listItem");
    }
    clear() {
        this.ul.innerHTML = "";
    }
    render(todoList) {
        todoList.list.forEach((item) => {
            const li = document.createElement("li");
            li.className = "item";
            const check = document.createElement("input");
            check.type = "checkbox";
            check.id = item.id;
            check.checked = item.checked;
            check.addEventListener("change", () => {
                item.checked = !item.checked;
                todoList.saveToLocalStorage();
            });
            const label = document.createElement("label");
            label.htmlFor = item.id;
            label.textContent = item.task;
            const btn = document.createElement("button");
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
ListTemplate.instance = new ListTemplate();
export default ListTemplate;
