import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { User } from './../../../models/user.class';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [ MatButtonModule, MatInputModule, MatDialogModule, MatProgressBarModule, MatFormFieldModule, FormsModule, MatProgressBarModule, MatDatepickerModule, MatNativeDateModule ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {
  user!: User;
  userId:string | null = null;
  loading = false;
  birthDate!: Date;

  firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>){}

  async editUser() {
    // this.user.birthDate = this.birthDate.getTime();

    try {
      this.loading = true;
      const userDocRef = doc(this.firestore, `users/${this.userId}`);
      await updateDoc(userDocRef, this.user.toJSON());
    } catch (err) {
      console.error('Error updating address:', err);
    } finally {
      this.loading = false;
      this.dialogRef.close();
    }
  }

  closeDialog(){
      this.dialogRef.close()
  }

}
