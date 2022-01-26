import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './components/menu/menu.component';
import { TodoDetailsComponent } from './pages/todo/todo-details/todo-details.component';
import { TodoOwnsComponent } from './pages/todo/todo-owns/todo-owns.component';
import { TodoUploadComponent } from './pages/todo/todo-upload/todo-upload.component';
import { WorkspacesAllComponent } from './pages/workspace/workspaces-all/workspaces-all.component';
import { WorkspacesDetailedComponent } from './pages/workspace/workspaces-detailed/workspaces-detailed.component';
import { TableDetailedComponent } from './pages/table/table-detailed/table-detailed.component';
import { TodayComponent } from './pages/today/today.component';
import { AssignedToMeComponent } from './pages/assigned-to-me/assigned-to-me.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { WorkspacesOwnComponent } from './pages/workspace/workspaces-own/workspaces-own.component';
import { HeaderComponent } from './components/header/header.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { InterceptorService } from './services/interceptor/interceptor.service';
import { RegistrationComponent } from './pages/registration/registration.component';
import { DeadlineValidatorDirective } from './services/validators/deadline/deadline-validator.directive';
import { AssigneeValidatorDirective } from './services/validators/assignee/assignee-validator.directive';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    MenuComponent,
    TodoDetailsComponent,
    TodoOwnsComponent,
    TodoUploadComponent,
    WorkspacesAllComponent,
    WorkspacesDetailedComponent,
    TableDetailedComponent,
    TodayComponent,
    AssignedToMeComponent,
    CalendarComponent,
    WorkspacesOwnComponent,
    HeaderComponent,
    CreateTaskComponent,
    RegistrationComponent,
    DeadlineValidatorDirective,
    AssigneeValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["http://localhost:37608/"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
