// src/app/trip-add/trip-add.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Trip, TripData } from '../trip-data';

@Component({
  selector: 'app-trip-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './trip-add.html',
  styleUrls: ['./trip-add.css']
})
export class TripAdd {

  trip: Trip = {
    code: '',
    name: '',
    length: 0,
    start: '',
    resort: '',
    perPerson: 0,
    image: '',
    description: ''
  };

  constructor(private tripService: TripData, private router: Router) {}

  addTrip(): void {
    this.tripService.addTrip(this.trip).subscribe({
      next: () => {
        this.tripService.triggerRefresh();
        this.router.navigate(['']);
      },
      error: (err: any) => {
        console.error('Error adding trip:', err);
      }
    });
  }
}