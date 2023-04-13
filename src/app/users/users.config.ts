import {InjectionToken} from '@angular/core';
// Create injection token and register it
export const UsersAPI = new InjectionToken<string>('UsersAPI', {
  providedIn: 'any',
  factory: () => 'http://localhost:3000/users',
});
