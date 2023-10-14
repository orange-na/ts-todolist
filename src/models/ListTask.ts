export interface Task {
  id: string;
  task: string;
  checked: boolean;
}

export default class ListTask implements Task {
  constructor(
    private _id: string = "",
    private _task: string = "",
    private _checked: boolean = false
  ) {
    this._id = _id;
    this._task = _task;
    this._checked = _checked;
  }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get task(): string {
    return this._task;
  }

  set task(task: string) {
    this._task = task;
  }

  get checked(): boolean {
    return this._checked;
  }

  set checked(checked: boolean) {
    this._checked = checked;
  }
}
