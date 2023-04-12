import {Component} from '@angular/core';
import {RouterOutlet, NavigationStart, Event} from '@angular/router';
import {CustomPreloadingStrategyService, MessagesService} from './core';
import {Router} from '@angular/router';
import {SpinnerService} from './widgets';
import {type Subscription, filter} from 'rxjs';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private sub: {[key: string]: Subscription} = {};
  constructor(
    public spinnerService: SpinnerService,
    public messagesService: MessagesService,
    private router: Router,
    private preloadingStrategy: CustomPreloadingStrategyService,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.setMessageServiceOnRefresh();
    console.log(`Preloading Modules: `, this.preloadingStrategy.preloadedModules);
  }

  onActivate($event: any, routerOutlet: RouterOutlet): void {
    console.log('Activated Component', $event, routerOutlet);
    this.metaService.addTags(routerOutlet.activatedRouteData['meta']);
  }

  onDeactivate($event: any, routerOutlet: RouterOutlet): void {
    console.log('Deactivated Component', $event, routerOutlet);
  }
  onRouterLinkActive($event: boolean): void {
    console.log($event);
  }
  onDisplayMessages(): void {
    this.router.navigate([{outlets: {messages: ['messages']}}]);
    this.messagesService.isDisplayed = true;
  }

  private setMessageServiceOnRefresh(): void {
    this.sub['navigationStart'] = this.router.events
      .pipe(filter((event: Event) => event instanceof NavigationStart))
      .subscribe((event: Event) => {
        this.messagesService.isDisplayed = (event as NavigationStart).url.includes('messages:');
      });
  }

  ngOnDestroy(): void {
    this.sub['navigationStart'].unsubscribe();
  }
}
