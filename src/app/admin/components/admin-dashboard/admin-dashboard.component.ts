import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {type Observable, map} from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  sessionId!: Observable<string>;
  token!: Observable<string>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Capture the session ID if available
    this.sessionId = this.route.queryParamMap.pipe(
      map((params) => params.get('sessionId') || 'None')
    );

    // Capture the fragment if available
    this.token = this.route.fragment.pipe(map((fragment) => fragment || 'None'));
  }
}
