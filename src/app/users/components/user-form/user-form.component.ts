import {Component, type OnInit, type OnDestroy} from '@angular/core';
import {ActivatedRoute, Router, UrlTree} from '@angular/router';
import type {Observable, Subscription} from 'rxjs';
import {DialogService} from './../../../core';
import type {CanComponentDeactivate} from './../../../core';

import {UserModel} from './../../models/user.model';
import {UserArrayService} from './../../services/user-array.service';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  user!: UserModel;
  originalUser!: UserModel;
  private onGoBackClick: boolean = false;

  private sub!: Subscription;

  constructor(
    private router: Router,
    private userArrayService: UserArrayService,
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
    this.onGoBackClick = true;
    this.router.navigate(['./../../'], {relativeTo: this.route});
  }
}
