import {Component, type OnInit} from '@angular/core';

import {TaskPromiseService} from './../../services';
import type {TaskModel} from './../../models/task.model';
import {Router} from '@angular/router';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks!: Promise<Array<TaskModel>>;

  constructor(private taskPromiseService: TaskPromiseService, private router: Router) {}

  ngOnInit(): void {
    //this.tasks = this.taskArrayService.getTasks();
    this.tasks = this.taskPromiseService.getTasks();
  }

  onCompleteTask(task: TaskModel): void {
    this.updateTask(task).catch((err) => console.log(err));
  }

  onEditTask(task: TaskModel): void {
    const link = ['/edit', task.id];
    this.router.navigate(link);
  }

  onCreateTask(): void {
    const link = ['/add'];
    this.router.navigate(link);
  }

  private async updateTask(task: TaskModel) {
    const updatedTask = await this.taskPromiseService.updateTask({
      ...task,
      done: true,
    });
    const tasks: TaskModel[] = await this.tasks;
    const index = tasks.findIndex((t) => t.id === updatedTask.id);
    tasks[index] = {...updatedTask};
  }
}
