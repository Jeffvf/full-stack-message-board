import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AuthUser, UserCredentials } from '../user';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errors: string = '';
  loginSection = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  constructor(
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  loginRequest(): void {
    const { username, password} = this.loginSection.value;
    const user: UserCredentials = {
      username: !username ? '' : username,
      password: !password ? '' : password
    }
    this.userService.login(user)
      .subscribe(userAuth => {
        console.log(userAuth);
        if(userAuth.errors){
          this.errors = userAuth.errors;
        }
        else{
          this.saveUserAuth(userAuth)
          this.errors = ''
          this.redirect();
        }
      });
  }

  saveUserAuth(user: AuthUser) {
    this.tokenStorage.saveToken(user.token)
    this.tokenStorage.saveUser(user.user)
  }

  redirect() {
    this.router.navigate([''])
  }
}
