import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit {

  public todo!: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(p => {

      if (p !== undefined && p.id !== undefined) {
        this.getTodo(p.id);
      }

    });
  }

  private async getTodo(id: string): Promise<any> {
    //this.todo = await this.todosService.getOne(id);
  }

}
