import { BaseTask } from "../baseTask.model";

export class SubTask extends BaseTask {

    isReady: boolean = false;
    mainTaskId!: string;

    editEnabled: boolean = false;

}