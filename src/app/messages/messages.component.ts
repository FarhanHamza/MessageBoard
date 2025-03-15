import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Message } from './message.model';
import * as MessagesActions from './store/messages.actions';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MessageFormsComponent } from './message-form/message-form.component';

@Component({
  selector: 'app-messages',
  imports: [CommonModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  messages$: Observable<Message[]>;
  loading$: Observable<boolean>;
  displayedColumns: string[] = ['id', 'email', 'message', 'createdAt'];

  constructor(
    private store: Store<{ messages: { messages: Message[], loading: boolean } }>,
    private dialog: MatDialog
  ) {
    this.messages$ = store.select(state => state.messages.messages);
    this.loading$ = store.select(state => state.messages.loading);
  }

  ngOnInit() {
    this.store.dispatch(MessagesActions.loadMessages());
  }

  openMessageForm() {
    this.dialog.open(MessageFormsComponent, {
      width: '90%',
      maxWidth: '500px',
      panelClass: 'message-dialog'
    });
  }

  showFullMessage(message: Message) {
    this.dialog.open(MessageFormsComponent, {
      width: '90%',
      maxWidth: '500px',
      data: { message, readonly: true }
    });
  }
}
