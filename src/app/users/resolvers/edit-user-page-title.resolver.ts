import {inject} from '@angular/core';
import {ResolveFn} from '@angular/router';
import {catchError, of, switchMap, take} from 'rxjs';
import {UserModel} from '../models/user.model';
import {UserObservableService} from '../services';

export const editUserPageTitleResolver: ResolveFn<string> = (route, state) => {
  const userObservableService = inject(UserObservableService);

  const defaultPageTitle = 'Edit User';

  if (!route.paramMap.has('userID')) {
    return of(defaultPageTitle);
  }

  const id = route.paramMap.get('userID')!;

  return userObservableService.getUser(id).pipe(
    switchMap((user: UserModel) => {
      if (user) {
        return of(`${defaultPageTitle}: ${user.firstName} ${user.lastName}`);
      } else {
        return of(defaultPageTitle);
      }
    }),
    take(1),
    catchError(() => {
      return of(defaultPageTitle);
    })
  );
};
