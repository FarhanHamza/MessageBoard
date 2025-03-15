import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Firestore, collection, addDoc, getDocs, query, orderBy } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { from, of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as MessagesActions from './messages.actions';
import { Message } from '../message.model';

@Injectable()
export class MessagesEffects {
  loadMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.loadMessages),
      mergeMap(() => {
        const messagesRef = collection(this.firestore, 'messages');
        const q = query(messagesRef, orderBy('createdAt', 'desc'));
        return from(getDocs(q)).pipe(
          map(snapshot => {
            const messages: Message[] = snapshot.docs.map(doc => ({
              id: doc.id,
              email: doc.data()['email'],
              message: doc.data()['message'],
              createdAt: doc.data()['createdAt'].toDate()
            }));
            return MessagesActions.loadMessagesSuccess({ messages });
          }),
          catchError(error => of(MessagesActions.loadMessagesFailure({ error })))
        );
      })
    )
  );

  addMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.addMessage),
      mergeMap(action => {
        const messagesRef = collection(this.firestore, 'messages');
        const newMessage = {
          email: action.email,
          message: action.message,
          createdAt: new Date()
        };
        return from(addDoc(messagesRef, newMessage)).pipe(
          map(docRef => {
            const message: Message = {
              id: docRef.id,
              ...newMessage
            };
            return MessagesActions.addMessageSuccess({ message });
          }),
          catchError(error => of(MessagesActions.addMessageFailure({ error })))
        );
      })
    )
  );

  showSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.addMessageSuccess),
      tap(() => {
        this.snackBar.open('Message added successfully', 'Close', {
          duration: 3000
        });
      })
    ),
    { dispatch: false }
  );

  showError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.addMessageFailure),
      tap(({ error }) => {
        this.snackBar.open('Error adding message: ' + error.message, 'Close', {
          duration: 3000
        });
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private firestore: Firestore,
    private snackBar: MatSnackBar
  ) {}
}