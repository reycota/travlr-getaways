import { Component, OnInit } from '@angular/core';
import { NgFor, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TripCard } from '../trip-card/trip-card';
import { TripData, Trip } from '../trip-data';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [NgFor, AsyncPipe, TripCard],
  templateUrl: './trip-list.html'
})
export class TripList implements OnInit {
  trips$!: Observable<Trip[]>;

  constructor(private tripService: TripData) {}

  ngOnInit(): void {
    this.trips$ = this.tripService.getTrips();
  }
}