import {Component, type OnInit} from '@angular/core';

import {TaskArrayService, TaskPromiseService} from './../../services';
import type {TaskModel} from './../../models/task.model';
import {Router} from '@angular/router';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks!: Promise<Array<TaskModel>>;

  constructor(
    private taskPromiseService: TaskPromiseService,
    private router: Router,
    private taskArrayService: TaskArrayService
  ) {}

  ngOnInit(): void {
    //this.tasks = this.taskArrayService.getTasks();
    this.tasks = this.taskPromiseService.getTasks();
  }

  onCompleteTask(task: TaskModel): void {
    const updatedTask = {...task, done: true};
    this.taskArrayService.updateTask(updatedTask);
  }

  onEditTask(task: TaskModel): void {
    const link = ['/edit', task.id];
    this.router.navigate(link);
  }
}
