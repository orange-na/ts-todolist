export default class ListTask {
    constructor(_id = "", _task = "", _checked = false) {
        this._id = _id;
        this._task = _task;
        this._checked = _checked;
        this._id = _id;
        this._task = _task;
        this._checked = _checked;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get task() {
        return this._task;
    }
    set task(task) {
        this._task = task;
    }
    get checked() {
        return this._checked;
    }
    set checked(checked) {
        this._checked = checked;
    }
}
