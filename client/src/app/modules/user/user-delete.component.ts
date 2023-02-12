import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { TokenStorageService } from "src/app/services/token-storage.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html'
})

export class UserDeleteComponent implements OnInit{
  deleteForm!: FormGroup;
  errors: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.deleteForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    })
  }

  deleteUser() {
    const { password, confirmPassword } = this.deleteForm.value;
    const id = this.route.snapshot.params['id'];
    this.userService.delete(id, password, confirmPassword)
      .subscribe((result: { errors: string; }) => {
        if(result.errors){
          this.errors = result.errors
        }
        else{
          this.tokenStorageService.signOut();
          this.router.navigate(['/']);
        }
      })
  }

  get password() { return this.deleteForm.get('password'); }

  get confirmPassword() { return this.deleteForm.get('confirmPassword'); }
}