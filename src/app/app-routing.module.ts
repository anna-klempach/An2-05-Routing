import {NgModule} from '@angular/core';
import {
  type Routes,
  type ExtraOptions,
  PreloadAllModules,
  RouterModule,
  type UrlSegment,
  type UrlSegmentGroup,
  type Route,
  type UrlMatchResult,
} from '@angular/router';

import {
  AboutComponent,
  AbcComponent,
  PathNotFoundComponent,
  MessagesComponent,
  LoginComponent,
} from './layout';
import {canMatchAuthGuard, CustomPreloadingStrategyService} from './core';

const extraOptions: ExtraOptions = {
  preloadingStrategy: CustomPreloadingStrategyService,
  //preloadingStrategy: PreloadAllModules,
  enableTracing: true, // Makes the router log all its internal events to the console.
  useHash: false,
};

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
    title: 'About',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
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
    path: 'admin',
    canMatch: [canMatchAuthGuard],
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
    data: {preload: false},
    title: 'Admin',
  },
  {
    path: 'admin',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
    data: {preload: true},
    title: 'Users',
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
    title: 'Page Not Found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, extraOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
