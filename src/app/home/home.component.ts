import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from '../modals/login-modal/login-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog:MatDialog) { }


  ngOnInit(): void {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(LoginModalComponent, {
      panelClass: 'app-full-bleed-dialog',
      width: '450px',
    });
  }

  scrollToAbout(){
    document.getElementById('aboutUs')?.scrollIntoView();
  }

}
