import {Component} from '@angular/core';
import type {RouterOutlet} from '@angular/router';
import {MessagesService} from './core';
import {Router} from '@angular/router';
import {SpinnerService} from './widgets';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    public spinnerService: SpinnerService,
    public messagesService: MessagesService,
    private router: Router
  ) {}
  onActivate($event: any, routerOutlet: RouterOutlet): void {
    console.log('Activated Component', $event, routerOutlet);
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
}
