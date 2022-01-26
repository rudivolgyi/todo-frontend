import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/auth/user.model';
import { UsersService } from 'src/app/services/backend/auth/users/users.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public userModel: User = new User();
  public invalidRegistration: boolean = false;

  constructor(private router: Router, private usersService: UsersService) { }

  ngOnInit(): void {
  }

  public async registration(): Promise<any> {
    try {
      let response = await this.usersService.upload(this.userModel);

      if (response.status !== null && response.status === false) {
        this.invalidRegistrationProcess();
        return;
      }
      
      this.invalidRegistration = false;

      this.router.navigate([""]);
    }
    catch {
      this.invalidRegistrationProcess();
      return;
    }
  }

  private invalidRegistrationProcess(){
    this.invalidRegistration = true;

    setTimeout(
      () => {
        this.invalidRegistration = false;
      }, 4000);
  }

  public hidePlaceholder(event: any) {
    event.target.type = "password";
  }

}
