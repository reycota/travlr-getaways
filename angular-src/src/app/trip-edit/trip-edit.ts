import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  trip!: Trip;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripService: TripData,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const tripId = params.get('tripId');
      if (tripId) {
        this.tripService.getTrip(tripId).subscribe({
          next: (trip: Trip) => {
            this.trip = trip;
            this.cdr.detectChanges();   
          },
          error: () => this.router.navigate(['/'])
        });
      }
    });
  }

  saveTrip(): void {
    if (!this.trip._id) return;

    this.tripService.updateTrip(this.trip._id, this.trip).subscribe({
      next: () => {
        this.tripService.triggerRefresh();
        this.router.navigate(['/']);
      }
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }
}