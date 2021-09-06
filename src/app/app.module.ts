import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DomainInterceptor } from './utils/domain.interceptor';

import AppComponent from './app.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: "create",
    component: CreateComponent
  },
  {
    path: "list",
    component: ListComponent
  },
  {
    path: "edit/:id",
    component: EditComponent
  },
  {
    path: "delete/:id",
    component: DeleteComponent
  },
  {
    path: "view/:id",
    component: ViewComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    DeleteComponent,
    ViewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DomainInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
