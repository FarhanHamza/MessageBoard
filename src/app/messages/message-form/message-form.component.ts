import { Component, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as MessagesActions from '../store/messages.actions';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-message-forms',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatProgressBarModule],
  templateUrl: './message-forms.component.html',
  styleUrl: './message-forms.component.css'
})
export class MessageFormsComponent {
  messageForm: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MessageFormsComponent>,
    private store: Store,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.messageForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500)
      ]]
    });
  }

  onSubmit() {
    if (this.messageForm.valid) {
      this.submitting = true;
      this.store.dispatch(MessagesActions.addMessage(this.messageForm.value));
      this.dialogRef.close();
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
