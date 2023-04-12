import {Component, type OnInit, type OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {type Subscription} from 'rxjs';

import {UserModel} from './../../models/user.model';
import {UserArrayService} from './../../services/user-array.service';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit, OnDestroy {
  user!: UserModel;
  originalUser!: UserModel;

  private sub!: Subscription;

  constructor(
    private router: Router,
    private userArrayService: UserArrayService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user = new UserModel(null, '', '');

    // we should recreate component because this code runs only once
    const id = this.route.snapshot.paramMap.get('userID')!;
    const observer = {
      next: (user: UserModel) => {
        this.user = {...user};
        this.originalUser = {...user};
      },
      error: (err: any) => console.log(err),
    };
    this.sub = this.userArrayService.getUser(id).subscribe(observer);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSaveUser(): void {
    const user = {...this.user};

    if (user.id) {
      this.userArrayService.updateUser(user);
      this.router.navigate(['/users', {editedUserID: user.id}]);
    } else {
      this.userArrayService.createUser(user);
      this.onGoBack();
    }
    this.originalUser = {...this.user};
  }

  onGoBack(): void {
    this.router.navigate(['./../../'], {relativeTo: this.route});
  }
}
