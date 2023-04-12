import {NgModule} from '@angular/core';
import {RouterModule, type Routes} from '@angular/router';
import {TaskFormComponent, TaskListComponent} from './components';
import type {MetaDefinition} from '@angular/platform-browser';

const metaTags: Array<MetaDefinition> = [
  {
    name: 'description',
    content: 'Task Manager Application. This is SPA',
  },
  {
    name: 'keywords',
    content: 'Angular tutorial, SPA, Routing',
  },
];
const routes: Routes = [
  {
    path: 'home',
    component: TaskListComponent,
    data: {
      meta: metaTags,
    },
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
