import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from './../services/auth.service';

export const canActivateAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const {url} = state;

  console.log('CanActivate Guard is called');
  return authService.checkLogin(url) ? true : router.parseUrl('/login');
};
