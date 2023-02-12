import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { User, UserRegister } from "src/app/models/user";
import { TokenStorageService } from "src/app/services/token-storage.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
})

export class UserUpdateComponent implements OnInit{
  errors: string = '';
  user!: User;

  constructor(
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
  }
  
  updateRequest(user: UserRegister){
    const id = this.route.snapshot.params['id'];
    this.userService.update(user, id)
      .subscribe(modifiedUser => {
        if(modifiedUser.errors){
          this.errors = modifiedUser.errors;
        }
        else{
          this.router.navigate([`users/user/${id}`])
        }
      })
  }
}