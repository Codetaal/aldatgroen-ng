import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'src/app/interfaces/message';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent implements OnInit {
  messages!: Message[];

  constructor(private messageService: MessageService, private router: Router) {}

  ngOnInit(): void {
    this.messageService.getMessages().subscribe((response: any) => {
      this.messages = response.data;
      console.log(this.messages);
    });
  }
}
