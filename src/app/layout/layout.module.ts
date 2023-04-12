import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutComponent, AbcComponent, PathNotFoundComponent, MessagesComponent} from './components';
import {FormsModule} from '@angular/forms';
@NgModule({
  declarations: [AboutComponent, AbcComponent, PathNotFoundComponent, MessagesComponent],
  imports: [CommonModule, FormsModule],
})
export class LayoutModule {}
