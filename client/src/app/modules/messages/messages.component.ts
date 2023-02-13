import { Component } from '@angular/core';
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
    console.log(message)
    this.messageService.addMessage(message).subscribe(message => {
      if(message.errors){
        console.log(message.errors);
      }
      else{
        window.location.reload();
      }
    })
  }
}
