import {Injectable} from '@angular/core';
import {PreloadingStrategy, type Route} from '@angular/router';
import {type Observable, EMPTY} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomPreloadingStrategyService implements PreloadingStrategy {
  public preloadedModules: string[] = [];

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data?.['preload'] && route.path) {
      this.preloadedModules.push(route.path);
      return load();
    } else {
      return EMPTY;
    }
  }
}
