import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string|undefined
  password: string|undefined
  token: string|undefined
  
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(!this.email || !this.password) {
      console.log("Empty");
      return
    }

    const user: User = { email: this.email, password: this.password }
    this.userService.login(user).subscribe()    
  }

}
