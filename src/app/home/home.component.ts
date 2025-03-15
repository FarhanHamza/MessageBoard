import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-home',
    imports: [MatCardModule, MatIconModule],
    template: `
    <mat-card class="welcome-card">
      <mat-card-header>
        <mat-icon class="header-icon">forum</mat-icon>
        <mat-card-title>Welcome to Message Board</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="content-wrapper">
          <mat-icon class="illustration">chat_bubble_outline</mat-icon>
          <p>This is a simple message board application built with Angular, NGRX, and Firebase. Share your thoughts and connect with others in real-time!</p>
        </div>
      </mat-card-content>
    </mat-card>
  `,
    styles: [`
    .welcome-card {
      max-width: 800px;
      margin: 2rem auto;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .header-icon {
      margin-right: 8px;
      color: #3f51b5;
    }

    .content-wrapper {
      display: flex;
      align-items: center;
      gap: 2rem;
      margin-top: 2rem;
    }

    .illustration {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #3f51b5;
    }

    p {
      font-size: 1.1rem;
      line-height: 1.6;
      color: rgba(0,0,0,0.7);
    }
  `]
})
export class HomeComponent {}