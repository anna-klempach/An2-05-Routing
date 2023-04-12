import {inject} from '@angular/core';
import {ResolveFn, Router} from '@angular/router';
import {catchError, delay, EMPTY, finalize, of, switchMap, take} from 'rxjs';
import {UserModel} from '../models/user.model';
import {UserArrayService} from '../services';
import {SpinnerService} from './../../widgets';

export const userResolver: ResolveFn<UserModel> = (route) => {
  const userArrayService = inject(UserArrayService);
  const router = inject(Router);
  const spinner = inject(SpinnerService);

  console.log('userResolver is called');

  if (!route.paramMap.has('userID')) {
    return of(new UserModel(null, '', ''));
  }
  spinner.show();
  const id = route.paramMap.get('userID')!;

  return userArrayService.getUser(id).pipe(
    delay(2000),
    switchMap((user: UserModel) => {
      if (user) {
        return of(user);
      } else {
        router.navigate(['/users']);
        return EMPTY;
      }
    }),
    take(1),
    catchError(() => {
      router.navigate(['/users']);
      // catchError MUST return observable
      return EMPTY;
    }),
    finalize(() => spinner.hide())
  );
};
