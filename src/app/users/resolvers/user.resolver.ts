import {inject} from '@angular/core';
import {ResolveFn, Router} from '@angular/router';
import {catchError, EMPTY, of, switchMap, take} from 'rxjs';
import {UserModel} from '../models/user.model';
import {UserArrayService} from '../services';

export const userResolver: ResolveFn<UserModel> = (route) => {
  const userArrayService = inject(UserArrayService);
  const router = inject(Router);

  console.log('userResolver is called');

  if (!route.paramMap.has('userID')) {
    return of(new UserModel(null, '', ''));
  }

  const id = route.paramMap.get('userID')!;

  return userArrayService.getUser(id).pipe(
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
    })
  );
};
