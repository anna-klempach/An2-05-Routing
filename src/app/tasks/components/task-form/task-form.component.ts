import {Component, type OnInit} from '@angular/core';
import {TaskModel} from './../../models/task.model';
import {ActivatedRoute, Router, type ParamMap} from '@angular/router';
import {map, switchMap} from 'rxjs';
import {TaskPromiseService} from '../../services';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  task!: TaskModel;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskPromiseService: TaskPromiseService
  ) {}

  ngOnInit(): void {
    this.task = new TaskModel();
    // it is not necessary to save subscription to route.paramMap
    // when router destroys this component, it handles subscriptions automatically
    const observer = {
      next: (task: TaskModel) => (this.task = {...task}),
      error: (err: any) => console.log(err),
    };
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          // notes about "!"
          // params.get() returns string | null, but getTask takes string | number
          // in this case taskID is NOT a path param and can not be null
          if (params.has('taskID')) {
            return this.taskPromiseService.getTask(params.get('taskID')!);
          } else {
            return Promise.resolve(undefined);
          }
        }),
        // transform undefined => {}
        map((el) => (el ? el : ({} as TaskModel)))
      )
      .subscribe(observer);
  }

  onSaveTask(): void {
    const task = {...this.task} as TaskModel;

    const method = task.id ? 'updateTask' : 'createTask';
    this.taskPromiseService[method](task)
      .then(() => this.onGoBack())
      .catch((err) => console.log(err));
  }

  onGoBack(): void {
    this.router.navigate(['/home']);
  }
}
