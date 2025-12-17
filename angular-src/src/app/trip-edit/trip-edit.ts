import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Trip, TripData } from '../trip-data';

@Component({
  selector: 'app-trip-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trip-edit.html',
  styleUrls: ['./trip-edit.css']
})
export class TripEdit implements OnInit {
  trip?: Trip;  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripService: TripData,
    private cdr: ChangeDetectorRef  // Manual trigger
  ) {}

  ngOnInit(): void {
    const tripId = this.route.snapshot.paramMap.get('tripId');

    if (!tripId) {
      this.router.navigate(['/']);
      return;
    }

    this.tripService.getTrip(tripId).subscribe({
      next: (trip) => {
        this.trip = trip;
        this.cdr.detectChanges();  //Force change detection for UI updates
      },
      error: (err) => {
        console.error('Failed to load trip:', err);
        alert('Failed to load trip');
        this.router.navigate(['/']);
      }
    });
  }

  saveTrip(): void {
    if (!this.trip?._id) {
      alert('Cannot save: missing trip ID');
      return;
    }

    this.tripService.updateTrip(this.trip._id, this.trip).subscribe({
      next: () => {
        this.tripService.triggerRefresh();
        this.router.navigate(['/']);
      },
      error: () => alert('Failed to save trip')
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}