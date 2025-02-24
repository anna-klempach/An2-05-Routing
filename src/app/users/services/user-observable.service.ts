import {Injectable, Inject} from '@angular/core';
import {
  HttpClient,
  HttpContext,
  HttpContextToken,
  type HttpErrorResponse,
} from '@angular/common/http';
import {type Observable, throwError, catchError, retry, share, concatMap} from 'rxjs';
import {UsersAPI} from './../users.config';
import {type UserModel} from './../models/user.model';

export const interceptorTOKEN = new HttpContextToken(() => 'Some Default Value');
@Injectable({
  providedIn: 'any',
})
export class UserObservableService {
  constructor(private http: HttpClient, @Inject(UsersAPI) private usersUrl: string) {}
  getUsers(): Observable<UserModel[]> {
    const httpOptions = {
      context: new HttpContext().set(interceptorTOKEN, 'Some Value'),
    };
    return this.http.get<UserModel[]>(this.usersUrl, httpOptions).pipe(
      retry(3),
      // in order not to create several subscriptions
      share(),
      catchError(this.handleError)
    );
  }
  getUser(id: NonNullable<UserModel['id']> | string) {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<UserModel>(url).pipe(retry(3), share(), catchError(this.handleError));
  }
  updateUser(user: UserModel): Observable<UserModel> {
    const url = `${this.usersUrl}/${user.id}`;
    return this.http.put<UserModel>(url, user).pipe(catchError(this.handleError));
  }
  createUser(user: UserModel): Observable<UserModel> {
    const url = this.usersUrl;
    return this.http.post<UserModel>(url, user).pipe(catchError(this.handleError));
  }

  deleteUser(user: UserModel): Observable<UserModel[]> {
    const url = `${this.usersUrl}/${user.id}`;
    return this.http.delete(url).pipe(
      concatMap(() => this.getUsers()),
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
