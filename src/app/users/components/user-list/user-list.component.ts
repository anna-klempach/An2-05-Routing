import {Component, type OnInit} from '@angular/core';
import {type Observable, EMPTY, switchMap} from 'rxjs';
import type {ParamMap} from '@angular/router';

import {type UserModel} from './../../models/user.model';
import {Router, ActivatedRoute} from '@angular/router';
import {UserObservableService} from '../../services';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users$!: Observable<Array<UserModel>>;
  private editedUser!: UserModel;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userObservableService: UserObservableService
  ) {}

  ngOnInit(): void {
    this.users$ = this.userObservableService.getUsers();
    const observer = {
      next: (user: UserModel) => {
        this.editedUser = {...user};
        console.log(`Last time you edited user ${JSON.stringify(this.editedUser)}`);
      },
      error: (err: any) => console.log(err),
    };
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          return params.has('editedUserID')
            ? this.userObservableService.getUser(params.get('editedUserID')!)
            : EMPTY;
        })
      )
      .subscribe(observer);
  }
  isEdited({id}: UserModel): boolean {
    if (this.editedUser) {
      return id === this.editedUser.id;
    }
    return false;
  }

  trackByFn(index: number, user: UserModel): number | null {
    return user.id;
  }

  onEditUser({id}: UserModel): void {
    //const link = ['/users/edit', id];
    //this.router.navigate(link);
    // or
    const link = ['edit', id];
    this.router.navigate(link, {relativeTo: this.route});
  }

  onDeleteUser(user: UserModel): void {
    this.users$ = this.userObservableService.deleteUser(user);
  }
}
