import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent implements OnInit {
  success: any;
  message: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.success = this.data.success;
    this.message = this.data.message;
  }

  ngOnInit() {
  }
}
