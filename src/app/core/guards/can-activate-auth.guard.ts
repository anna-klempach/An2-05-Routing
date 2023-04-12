import {CanActivateFn} from '@angular/router';

export const canActivateAuthGuard: CanActivateFn = (route, state) => {
  console.log('CanActivate Guard is called');
  return true;
};
