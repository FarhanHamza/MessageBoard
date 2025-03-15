import { createReducer, on } from '@ngrx/store';
import { Message } from '../message.model';
import * as MessagesActions from './messages.actions';

export interface MessagesState {
  messages: Message[];
  loading: boolean;
  error: any;
}

export const initialState: MessagesState = {
  messages: [],
  loading: false,
  error: null
};

export const messagesReducer = createReducer(
  initialState,
  on(MessagesActions.loadMessages, state => ({
    ...state,
    loading: true
  })),
  on(MessagesActions.loadMessagesSuccess, (state, { messages }) => ({
    ...state,
    messages,
    loading: false
  })),
  on(MessagesActions.loadMessagesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(MessagesActions.addMessage, state => ({
    ...state,
    loading: true
  })),
  on(MessagesActions.addMessageSuccess, (state, { message }) => ({
    ...state,
    messages: [...state.messages, message],
    loading: false
  })),
  on(MessagesActions.addMessageFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);