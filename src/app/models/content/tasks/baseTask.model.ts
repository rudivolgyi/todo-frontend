import { Timestamp } from "rxjs";

export abstract class BaseTask {

    id!: string;
    title!: string;
    deadlineDate: Date = new Date();
    deadlineTime: string = "";
    order!: number;

    private _deadline!: Date;

    public get deadline(): Date {
        let fullDeadline = new Date(this.deadlineDate);
        fullDeadline.setHours(+(this.deadlineTime.split(":")[0]));
        fullDeadline.setMinutes(+(this.deadlineTime.split(":")[1]));
        return fullDeadline;
    }
    
    public set deadline(value: Date) {
        this._deadline = value;
    }
}