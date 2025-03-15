import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { routes } from './app.routes';
import { messagesReducer } from './messages/store/messages.reducer';
import { MessagesEffects } from './messages/store/messages.effects';

const firebaseConfig = {
  apiKey: "AIzaSyBF_jjzTS3G1Nqqn6tgaeQ5GIxsEit7CT8",
  authDomain: "onlineshop-opa-ec004.firebaseapp.com",
  databaseURL: "https://onlineshop-opa-ec004.firebaseio.com",
  projectId: "onlineshop-opa-ec004",
  storageBucket: "onlineshop-opa-ec004.firebasestorage.app",
  messagingSenderId: "169587320095",
  appId: "1:169587320095:web:c65a2f4ebadcec672d7c2a"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideStore({
      messages: messagesReducer
    }),
    provideEffects(MessagesEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())
  ]
};