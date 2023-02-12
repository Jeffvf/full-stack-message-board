import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { User, UserDetail } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})

export class UserDetailsComponent implements OnInit{

  userDetail!: UserDetail;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser()
  }

  getUser(){
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id)
      .subscribe(user => this.userDetail = user);
    console.log(this.user)
  }

  get user() { return this.userDetail.user }

  get messages() { return this.userDetail.messages }

  updateRedirect(){
    this.router.navigate(['update'], { relativeTo: this.route });
  }

  deleteRedirect(){
    this.router.navigate(['delete'], { relativeTo: this.route })
  }
}