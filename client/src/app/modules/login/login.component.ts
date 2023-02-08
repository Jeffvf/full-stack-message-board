import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUser, UserCredentials } from 'src/app/models/user';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { PrimeNGConfig } from 'primeng/api';



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
    private router: Router,
    private primengConfig: PrimeNGConfig
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

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
