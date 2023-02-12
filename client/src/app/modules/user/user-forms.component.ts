import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User, UserRegister } from "src/app/models/user";
import { passwordMatch } from "src/app/shared/custom-validators";

@Component({
  selector:'app-user-forms',
  templateUrl:'./user-forms.component.html'
})

export class UserFormsComponent implements OnInit{
  @Input('user') user?: User;
  @Input('errors') errors?: string;

  @Output('submitMethod') newUserEvent = new EventEmitter<UserRegister>()

  submitMethod(){
    this.newUserEvent.emit(this.registerForm.value);
  }
  
  registerForm! : FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: [this.user?.firstName, Validators.required],
      lastName: [this.user?.lastName, Validators.required],
      username: [this.user?.username, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    },  { validator: passwordMatch })
  }

  get firstName() { return this.registerForm.get('firstName'); }

  get lastName() { return this.registerForm.get('lastName'); }

  get username() { return this.registerForm.get('username'); }

  get password() { return this.registerForm.get('password'); }

  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
}