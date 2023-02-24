import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor(
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private primengConfig: PrimeNGConfig
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  get username() { return this.loginSection.get('username') }

  get password() { return this.loginSection.get('password') }
  
  loginRequest(): void {
    const { username, password} = this.loginSection.value;
    const user: UserCredentials = {
      username: !username ? '' : username,
      password: !password ? '' : password
    }
    this.userService.login(user)
      .subscribe(userAuth => {
        if(userAuth.errors){
          this.errors = userAuth.errors;
        }
        else{
          this.saveUserAuth(userAuth)
          this.errors = ''
          this.reload();
        }
      });
  }

  saveUserAuth(user: AuthUser) {
    this.tokenStorage.saveToken(user.token)
    this.tokenStorage.saveUser(user.user)
  }

  reload() {
    window.location.reload();
  }
}
