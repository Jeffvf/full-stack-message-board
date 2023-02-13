import { Component } from '@angular/core';
import { ServerError } from 'src/app/models/error';
import { Message, MessageRegister } from 'src/app/models/message';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  messages: Message[] = [];
  displayModal = false;
  errors?: ServerError[];

  constructor(
    private messageService: MessageService) {}

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages(): void {
    this.messageService.getMessages()
      .subscribe(messages => this.messages = messages);
  }

  modalDisplay(display: boolean){
    this.displayModal = display;
  }

  addMessage(message: MessageRegister){
    this.messageService.addMessage(message).subscribe(message => {
      if(message.errors){
        this.errors = message.errors;
      }
      else{
        window.location.reload();
      }
    })
  }
}
