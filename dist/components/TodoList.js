import ListTask from "../models/ListTask";
class TodoList {
    constructor(_list = []) {
        this._list = _list;
    }
    get list() {
        return this._list;
    }
    set list(list) {
        this._list = list;
    }
    display() {
        const storedList = localStorage.getItem("todoList");
        if (typeof storedList !== "string")
            return;
        const parsedList = JSON.parse(storedList);
        parsedList.forEach((itemObj) => {
            const newListItem = new ListTask(itemObj._id, itemObj._task, itemObj._checked);
            TodoList.instance.addNew(newListItem);
        });
    }
    saveToLocalStorage() {
        localStorage.setItem("todoList", JSON.stringify(this._list));
    }
    clearList() {
        this._list = [];
        this.saveToLocalStorage();
    }
    addNew(itemObj) {
        this._list.push(itemObj);
        this.saveToLocalStorage();
    }
    removeTask(id) {
        this._list = this._list.filter((item) => item.id !== id);
        this.saveToLocalStorage();
    }
}
TodoList.instance = new TodoList();
export default TodoList;
