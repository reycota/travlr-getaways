import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip, TripData } from '../trip-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.html',
  styleUrls: ['./trip-card.css']
})
export class TripCard {
  @Input() trip!: Trip;

  constructor(
    private tripService: TripData,
    private router: Router
  ) {}

  edit() {
    this.router.navigate(['/edit', this.trip._id]);
  }

  delete() {
    if (confirm(`Delete "${this.trip.name}" permanently?`)) {
      this.tripService.deleteTrip(this.trip._id!).subscribe({
        next: () => this.tripService.triggerRefresh(),
        error: () => alert('Failed to delete trip')
      });
    }
  }
}
