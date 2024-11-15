import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from './../../models/user.class';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogEditAddressComponent } from './dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from './dialog-edit-user/dialog-edit-user.component';
import { take } from 'rxjs/operators';




@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIconModule, MatButtonModule, MatMenuModule, MatDialogModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {

  userId: string | null = null;
  user$!: Observable<User>; 

  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog){}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
      this.getUser(this.userId);
    });
  }

  getUser(userId: any) {
    const userDocRef = doc(this.firestore, `users/${userId}`);
    this.user$ = docData(userDocRef) as Observable<User>; 
  }

  openEditAddressDialog() {
    this.user$.pipe(take(1)).subscribe(user => {
      const dialog = this.dialog.open(DialogEditAddressComponent);
      dialog.componentInstance.user = new User({ ...user });
      dialog.componentInstance.userId = this.userId;
    });
  }

  openEditUserDialog() {
    this.user$.pipe(take(1)).subscribe(user => {
      const dialog = this.dialog.open(DialogEditUserComponent);
      dialog.componentInstance.user = new User({ ...user });
      dialog.componentInstance.userId = this.userId;
    });
  }

}
