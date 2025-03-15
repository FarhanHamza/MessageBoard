import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule],
    template: `
    <mat-toolbar color="primary" class="navbar">
      <span>Message Board</span>
      <div class="nav-links">
        <a mat-button routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
          <mat-icon>home</mat-icon>
          Home
        </a>
        <a mat-button routerLink="/messages" routerLinkActive="active">
          <mat-icon>message</mat-icon>
          Messages
        </a>
      </div>
      <button mat-icon-button class="search-button" aria-label="Search">
        <mat-icon>search</mat-icon>
      </button>
    </mat-toolbar>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
    styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 16px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .nav-links {
      flex: 1;
      margin-left: 20px;
      display: flex;
      gap: 8px;
    }

    .nav-links a {
      display: flex;
      align-items: center;
      gap: 4px;
      transition: all 0.3s ease;
    }

    .nav-links a:hover {
      background: rgba(255,255,255,0.1);
    }

    .nav-links a.active {
      background: rgba(255,255,255,0.2);
    }

    .search-button {
      margin-left: auto;
    }

    .container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
  `]
})
export class AppComponent {}