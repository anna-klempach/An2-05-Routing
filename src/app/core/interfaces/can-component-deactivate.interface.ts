import type {UrlTree} from '@angular/router';

// rxjs
import type {Observable} from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate: () =>
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree;
}
