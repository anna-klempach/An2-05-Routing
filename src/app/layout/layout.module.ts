import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  AboutComponent,
  LoginComponent,
  AbcComponent,
  PathNotFoundComponent,
  MessagesComponent,
} from './components';
import {FormsModule} from '@angular/forms';
@NgModule({
  declarations: [
    AboutComponent,
    AbcComponent,
    PathNotFoundComponent,
    MessagesComponent,
    LoginComponent,
  ],
  imports: [CommonModule, FormsModule],
})
export class LayoutModule {}
