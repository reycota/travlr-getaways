import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf, CommonModule } from '@angular/common';
import { Trip, TripData } from '../trip-data';

@Component({
  selector: 'app-trip-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf],
  templateUrl: './trip-edit.html',
  styleUrls: ['./trip-edit.css']
})
export class TripEdit implements OnInit {
  trip?: Trip;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripService: TripData
  ) {}

  ngOnInit(): void {
    const tripId = this.route.snapshot.paramMap.get('tripId');
    if (!tripId) {
      this.router.navigate(['/']);
      return;
    }

    this.tripService.getTrip(tripId).subscribe({
      next: (trip: Trip) => this.trip = trip,
      error: () => this.router.navigate(['/'])
    });
  }

  saveTrip(): void {
    if (!this.trip?._id) return;

    this.tripService.updateTrip(this.trip._id, this.trip).subscribe({
      next: () => {
        this.tripService.triggerRefresh();
        this.router.navigate(['/']);
      },
      error: () => alert('Update failed')
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }
}