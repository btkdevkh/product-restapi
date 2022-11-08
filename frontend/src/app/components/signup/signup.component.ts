import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email: string|undefined
  password: string|undefined
  
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(!this.email || !this.password) {
      console.log("Empty");
      return
    }

    const user = {
      email: this.email,
      password: this.password
    }
    
    this.userService.signup(user).subscribe()
  }

}
