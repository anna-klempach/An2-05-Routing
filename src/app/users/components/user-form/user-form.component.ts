import {Component, type OnInit} from '@angular/core';
import {ActivatedRoute, Router, UrlTree, type Data} from '@angular/router';
import {map, Observable, Subscription} from 'rxjs';
import {AutoUnsubscribe, DialogService} from './../../../core';
import type {CanComponentDeactivate} from './../../../core';
import {UserObservableService} from './../../services';
import {Location} from '@angular/common';

import {UserModel} from './../../models/user.model';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
@AutoUnsubscribe()
export class UserFormComponent implements OnInit, CanComponentDeactivate {
  user!: UserModel;
  originalUser!: UserModel;
  private onGoBackClick: boolean = false;
  private sub!: Subscription;

  constructor(
    private router: Router,
    private userObservableService: UserObservableService,
    private location: Location,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) {}
  canDeactivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.onGoBackClick) return true;

    const flags = (Object.keys(this.originalUser) as (keyof UserModel)[]).map((key) => {
      if (this.originalUser[key] === this.user[key]) {
        return true;
      }
      return false;
    });

    if (flags.every((el) => el)) {
      return true;
    }

    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }

  ngOnInit(): void {
    this.route.data.pipe(map((data: Data) => data['user'])).subscribe((user: UserModel) => {
      this.user = {...user};
      this.originalUser = {...user};
    });
  }

  onSaveUser(): void {
    const user = {...this.user};

    const method = user.id ? 'updateUser' : 'createUser';
    const observer = {
      next: (savedUser: UserModel) => {
        this.originalUser = {...savedUser};
        user.id
          ? // optional parameter: http://localhost:4200/users;editedUserID=2
            this.router.navigate(['users', {editedUserID: user.id}])
          : this.onGoBack();
      },
      error: (err: any) => console.log(err),
    };
    this.sub = this.userObservableService[method](user).subscribe(observer);
  }

  onGoBack(): void {
    this.onGoBackClick = true;
    this.location.back();
  }
}
