import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { User } from 'src/app/models/auth/user.model';
import { MainTask } from 'src/app/models/content/tasks/mainTasks/mainTask.model';
import { SubTask } from 'src/app/models/content/tasks/subTasks/subTask.model';
import { UsersService } from 'src/app/services/backend/auth/users/users.service';
import { MainTasksService } from 'src/app/services/backend/content/tasks/main-tasks.service';
import { SubTasksService } from 'src/app/services/backend/content/tasks/sub-tasks.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  public minDate: Date = new Date();
  public assigneeSearchList: Array<User> = [];
  public subTaskCreationEnabled: boolean = false;
  public donePercentage: number = 0;

  private deletableSubTasks: Array<SubTask> = [];

  @Input() task!: MainTask;
  @Input() listTitle!: string;
  @Output() closePopup = new EventEmitter();

  @ViewChild("assigneeSearchInput") assigneeSearchInput!: ElementRef<HTMLInputElement>;

  constructor(private mainTaskService: MainTasksService, private subTaskService: SubTasksService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.calculatePercentage();
  }

  public close(event: any): void {
    if ((<HTMLElement>event.target).classList.contains("popupCloses")) {
      this.closePopup.emit();
    }
  }

  public async save(): Promise<any> {
    if (this.task.id === undefined) {
      this.task.id = await this.mainTaskService.upload(this.task);
    }
    else {
      await this.mainTaskService.edit(this.task.id, this.task);

      for (let deletableSubTask of this.deletableSubTasks) {
        await this.subTaskService.delete(deletableSubTask.id);
      }
  
      for (let subtask of this.task.subTasks) {
        if (subtask.id !== undefined) {
          await this.subTaskService.edit(subtask.id, subtask);
        }
        else {
          subtask.mainTaskId = this.task.id;
          await this.subTaskService.upload(subtask);
        }
      }
    }

    this.closePopup.emit();
  }

  public calculatePercentage(): void {
    let sum: number = this.task.subTasks.length;
    let readySubTasks: number = this.task.subTasks.filter(st => st.isReady === true).length;

    this.donePercentage = Math.floor((100 * readySubTasks) / sum);
    
    if (Number.isNaN(this.donePercentage)) {
      this.donePercentage = 0;
    }
  }

  public subTaskReadyToggle(subTask: SubTask): void {
    subTask.isReady = !subTask.isReady;
    this.calculatePercentage();
  }

  public createSubTask(name: string): void {

    if (0 < name.length) {

      let newSubTask: SubTask = new SubTask();
      newSubTask.title = name;

      this.task.subTasks.push(newSubTask);
      this.subTaskCreationEnabled = false;
      this.calculatePercentage();
    }
  }

  public editSubTask(subTask: SubTask, name: string): void {
    if (0 < name.length) {
      subTask.title = name;
    }
  }

  public async searchAssignees(): Promise<any> {
    
    let name = this.assigneeSearchInput.nativeElement.value;
    this.assigneeSearchList = [];

    if (name !== undefined && 2 < name.length) {
      this.assigneeSearchList = await this.usersService.searchByName(name);
    }
  }

  public removeSubTask(subTask: SubTask): void {
    let originalSubTask = this.task.subTasks.find(st => st === subTask);   

    if (originalSubTask !== undefined) {
      let index = this.task.subTasks.indexOf(originalSubTask);

      if (0 <= index) {
        this.task.subTasks.splice(index, 1);
      }
      
      if (originalSubTask.id !== undefined) {
        this.deletableSubTasks.push(subTask);
      }
    }    
  }

  public selectAssignee(assignee: User): void {
    this.task.assignee = assignee;
    this.assigneeSearchList = [];
    this.assigneeSearchInput.nativeElement.value = "";
  }

  public removeAssignee(): void {
    this.task.assignee = undefined;
  }

  public async deleteTask(task: MainTask): Promise<any> {
    await this.mainTaskService.delete(task.id);
    this.closePopup.emit();
  }

  public isOtherDataValid(): boolean {

    if (this.task.assignee !== null && this.task.assignee !== undefined && 0 < this.task.subTasks.length) {
      return true;
    }

    return false;
  }

  @HostListener("document:click", ["$event"])
  public onClick(event: any) {

    if (this.assigneeSearchInput !== undefined && event.target !== this.assigneeSearchInput.nativeElement) {
      this.assigneeSearchList = [];
      this.assigneeSearchInput.nativeElement.value = "";
    }
  }

}
