import {NgModule} from '@angular/core';
import {RouterModule, type Routes} from '@angular/router';
import {TaskFormComponent, TaskListComponent} from './components';

const routes: Routes = [
  {
    path: 'home',
    component: TaskListComponent,
  },
  {
    path: 'edit/:taskID',
    component: TaskFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
