import { User } from "src/app/models/auth/user.model";
import { BaseTask } from "../baseTask.model";
import { SubTask } from "../subTasks/subTask.model";

export class MainTask extends BaseTask {

    description: string = "";
    priority: number = 0;
    subTasks: Array<SubTask> = [];
    taskListId!: string;
    assignee!: User | undefined;

}