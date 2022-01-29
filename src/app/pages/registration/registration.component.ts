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
  public disableButton: boolean = false;

  constructor(private router: Router, private usersService: UsersService) { }

  ngOnInit(): void {
  }

  public async registration(): Promise<any> {
    try {
      this.disableButton = true;

      let response = await this.usersService.upload(this.userModel);

      if (response === null) {
        this.router.navigate([""]);
      }
      else {
        throw new Error();
      }
    }
    catch {
      this.invalidRegistrationProcess();
      return;
    }
  }

  private invalidRegistrationProcess(){
    this.disableButton = false;
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
