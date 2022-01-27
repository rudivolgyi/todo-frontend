import { Table } from "../tables/table.model";
import { MainTask } from "../tasks/mainTasks/mainTask.model";

export class List {

    id!: string;
    title!: string;
    tasks!: Array<MainTask>;
    tableId!: string;
    
    isTaskCreationEnabled: boolean = false;
    isContextMenuEnabled: boolean = false;

}