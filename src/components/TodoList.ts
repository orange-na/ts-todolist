import ListTask from "../models/ListTask";

interface List {
  list: ListTask[];
  display(): void;
  saveToLocalStorage(): void;
  clearList(): void;
  addNew(itemObj: ListTask): void;
  removeTask(id: string): void;
}

export default class TodoList implements List {
  static instance: TodoList = new TodoList();
  private constructor(private _list: ListTask[] = []) {}

  get list(): ListTask[] {
    return this._list;
  }

  set list(list: ListTask[]) {
    this._list = list;
  }

  display(): void {
    const storedList: string | null = localStorage.getItem("todoList");
    if (typeof storedList !== "string") return;

    const parsedList: { _id: string; _task: string; _checked: boolean }[] =
      JSON.parse(storedList);

    parsedList.forEach((itemObj) => {
      const newListItem = new ListTask(
        itemObj._id,
        itemObj._task,
        itemObj._checked
      );
      TodoList.instance.addNew(newListItem);
    });
  }

  saveToLocalStorage(): void {
    localStorage.setItem("todoList", JSON.stringify(this._list));
  }

  clearList(): void {
    this._list = [];
    this.saveToLocalStorage();
  }

  addNew(itemObj: ListTask): void {
    this._list.push(itemObj);
    this.saveToLocalStorage();
  }

  removeTask(id: string): void {
    this._list = this._list.filter((item) => item.id !== id);
    this.saveToLocalStorage();
  }
}
