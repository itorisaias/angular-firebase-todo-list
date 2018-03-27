import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators/take';

import { MatDialog, MatDialogConfig } from '@angular/material';

import { Task } from '../models/task.model';
import { TaskService } from '../task.service';

import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;
  selectedTask: Task;
  loading = true;

  constructor(private dialog: MatDialog, private taskService: TaskService) {}

  ngOnInit() {
    this.tasks$ = this.taskService.tasks.valueChanges();
    this.tasks$.pipe(take(1)).subscribe(() => (this.loading = false));
  }

  public onPerformTask(task: Task): void {
    task.done = !task.done;
    this.taskService.update(task);
  }

  public showDialog(task?: Task) {
    const config: MatDialogConfig<any> = task ? { data: { task } } : null;
    this.dialog.open(TaskDialogComponent, config);
  }

  public onDelete(task: Task) {
    this.taskService.delete(task);
  }
}
