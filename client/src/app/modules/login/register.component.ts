import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserRegister } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";
import { passwordMatch } from "src/app/shared/custom-validators";
import { Router } from "@angular/router";



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit{
  errors: string = '';
  
  registerForm! : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) {}
  
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    },  { validator: passwordMatch })
  }

  get firstName() { return this.registerForm.get('firstName'); }

  get lastName() { return this.registerForm.get('lastName'); }

  get username() { return this.registerForm.get('username'); }

  get password() { return this.registerForm.get('password'); }

  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  registerRequest(user: UserRegister): void {
    this.userService.register(user)
      .subscribe(newUser => {
        if(newUser.errors){
          this.errors = newUser.errors;
        }
        else{
          this.router.navigate(['login'])
        }
      })
  }
}