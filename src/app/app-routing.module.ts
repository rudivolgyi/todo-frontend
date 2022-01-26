import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignedToMeComponent } from './pages/assigned-to-me/assigned-to-me.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { TableDetailedComponent } from './pages/table/table-detailed/table-detailed.component';
import { TodayComponent } from './pages/today/today.component';
import { WorkspacesAllComponent } from './pages/workspace/workspaces-all/workspaces-all.component';
import { WorkspacesDetailedComponent } from './pages/workspace/workspaces-detailed/workspaces-detailed.component';
import { WorkspacesOwnComponent } from './pages/workspace/workspaces-own/workspaces-own.component';
import { AuthService } from './services/auth/auth.service';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "registration", component: RegistrationComponent },
  { path: "home", component: HomeComponent, canActivate: [AuthService] },
  { path: "profile", component: ProfileComponent, canActivate: [AuthService] },
  { path: "today", component: TodayComponent, canActivate: [AuthService] },
  { path: "calendar", component: CalendarComponent, canActivate: [AuthService] },
  { path: "assignedToMe", component: AssignedToMeComponent, canActivate: [AuthService] },
  { path: "workspaces/all", component: WorkspacesAllComponent, canActivate: [AuthService] },
  { path: "workspaces/own", component: WorkspacesOwnComponent, canActivate: [AuthService] },
  { path: "workspaces/detailed", component: WorkspacesDetailedComponent, canActivate: [AuthService] },
  { path: "tables/detailed", component: TableDetailedComponent, canActivate: [AuthService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
