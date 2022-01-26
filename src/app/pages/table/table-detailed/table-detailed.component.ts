import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List } from 'src/app/models/content/lists/list.model';
import { Table } from 'src/app/models/content/tables/table.model';
import { MainTask } from 'src/app/models/content/tasks/mainTasks/mainTask.model';
import { ListsService } from 'src/app/services/backend/content/lists/lists.service';
import { TablesService } from 'src/app/services/backend/content/tables/tables.service';
import { MainTasksService } from 'src/app/services/backend/content/tasks/main-tasks.service';

@Component({
  selector: 'app-table-detailed',
  templateUrl: './table-detailed.component.html',
  styleUrls: ['./table-detailed.component.css']
})
export class TableDetailedComponent implements OnInit {

  public isEditAllowed: boolean = false;
  public editableTask!: MainTask;
  public editableTaskListTitle!: string;
  public isListCreationAllowed: boolean = false;
  public isFilterMenuOpened: boolean = false;
  public table!: Table;

  public isFilteredByStatus: boolean = false;
  public isFilteredStatusDone: boolean = false;
  public isFilteredStatusTodo: boolean = false;

  constructor(private route: ActivatedRoute, private tablesService: TablesService, private listService: ListsService, private mainTaskService: MainTasksService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(p => {

      if (p !== undefined && p.id !== undefined) {
        this.getTable(p.id);
      }

    });
  }

  private async getTable(id: string, filterSwitch?: boolean): Promise<any> {
    this.table = await this.tablesService.getOne(id);

    if (filterSwitch !== undefined && filterSwitch && this.isFilteredByStatus) {
      let filterParam = this.isFilteredStatusDone ? true : false;
      this.filterTableByStatus(filterParam);
    }
  }

  public isExpired(task: MainTask): boolean {
    let now = new Date();

    let fullDeadline = new Date(task.deadlineDate);

    if (task.deadlineTime !== null && task.deadlineTime !== undefined && task.deadlineTime !== "") {
      fullDeadline.setHours(+(task.deadlineTime.split(":")[0]));
      fullDeadline.setMinutes(+(task.deadlineTime.split(":")[1]));
    }
    else {
      now.setHours(0, 0, 0, 0);
      fullDeadline.setHours(0, 0, 0, 0);
    }

    return fullDeadline <= now;
  }

  public async saveNewTask(listId: string, newTaskName: string): Promise<any> {

    if (0 < newTaskName.length && newTaskName.length < 51) {

      let newTask = new MainTask();
      newTask.title = newTaskName;
      newTask.taskListId = listId;
      
      this.enableEdit(newTask);

      //await this.mainTaskService.upload(newTask);
      //this.getTable(this.table.id);
    }
  }

  public enableEdit(task: MainTask): void {

    let index = this.table.lists.findIndex(l => l.id === task.taskListId);

    this.editableTaskListTitle = this.table.lists[index].title;

    this.isEditAllowed = true;
    this.editableTask = task;
  }

  public async disableEdit(): Promise<any> {
    this.isEditAllowed = false;
    await this.getTable(this.table.id, true);
  }

  public async saveNewList(newListName: string): Promise<any> {

    if (0 < newListName.length && newListName.length < 51) {

      let newList = new List();
      newList.title = newListName;
      newList.tableId = this.table.id;
      
      await this.listService.upload(newList);

      this.isListCreationAllowed = false;
      this.getTable(this.table.id, true);
    }
  }

  public async editList(list: List): Promise<any> {

    if (0 < list.title.length && list.title.length < 51) {
      await this.listService.edit(list.id, list);
    }

    this.getTable(this.table.id, true);
  }

  @HostListener("document:click", ["$event"])
  public onClick(event: any) {

    if (!this.isFilterMenuOpened && event.target.id === "taskFilterButton") {
      this.isFilterMenuOpened = true;
    }
    else {
      this.isFilterMenuOpened = false;
    }
  }

  //
  public async resetFilters(): Promise<any> {
    await this.getTable(this.table.id, false);
    this.isFilteredByStatus = false;
  }

  public async filterTableByStatus(isDone: boolean): Promise<any> {

    this.isFilteredByStatus = true;

    await this.getTable(this.table.id, false);

    this.table.lists.forEach(l => {

      this.filterListByStatus(l, isDone);

    });
  }

  public filterListByStatus(list: List, isDone: boolean): void {

    list.tasks = list.tasks.filter(t => {

      if (t.subTasks.length === t.subTasks.filter(st => st.isReady === isDone).length) {
        return true;
      }

      return false;
    });

  }

}
