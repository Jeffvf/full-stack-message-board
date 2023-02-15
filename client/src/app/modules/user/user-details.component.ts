import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "src/app/services/message.service";
import { Message, MessageRegister } from "src/app/models/message";
import { UserDetail } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";
import { ServerError } from "src/app/models/error";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})

export class UserDetailsComponent implements OnInit{

  userDetail!: UserDetail;
  showMessageDetail = false;
  message?: Message;
  errors?: ServerError[];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.getUser()
  }

  getUser(){
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id)
      .subscribe(user => {
        this.userDetail = user;
      });
  }

  get user() { return this.userDetail.user }

  get messages() { return this.userDetail.messages }

  msg(msg: Message) { this.message = msg; }

  displayModal(display: boolean){
    this.showMessageDetail = display;
  }

  updateMessage(message: MessageRegister){
    this.messageService.updateMessage(message, this.message!._id).subscribe(msg => {
      if(msg.errors){
        this.errors = msg.errors;
      }
      else{
        window.location.reload();
      }
    })
  }

  updateRedirect(){
    this.router.navigate(['update'], { relativeTo: this.route });
  }

  deleteRedirect(){
    this.router.navigate(['delete'], { relativeTo: this.route })
  }
}