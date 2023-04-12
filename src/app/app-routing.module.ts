import {NgModule} from '@angular/core';
import {
  Routes,
  RouterModule,
  type UrlSegment,
  type UrlSegmentGroup,
  type Route,
  type UrlMatchResult,
} from '@angular/router';

import {AboutComponent, AbcComponent, PathNotFoundComponent, MessagesComponent} from './layout';

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    component: AbcComponent,
    matcher: (url: UrlSegment[], group: UrlSegmentGroup, route: Route): UrlMatchResult | null => {
      console.log(url, group, route);
      // один фрагмент, который включает 'abc'
      return url.length === 1 && url[0].path.includes('abc') ? {consumed: url} : null;
    },
  },
  {
    path: 'messages',
    component: MessagesComponent,
    outlet: 'messages',
  },

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    // The router will match this route if the URL requested
    // doesn't match any paths for routes defined in our configuration
    path: '**',
    component: PathNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
