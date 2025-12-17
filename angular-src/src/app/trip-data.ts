import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './models/user';
import { AuthResponse } from './models/auth-response';

export interface Trip {
  _id?: string;
  code: string;
  name: string;
  length: number;
  start: string;
  resort: string;
  perPerson: number;
  image: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class TripData {

  private tripsUrl = 'http://localhost:3000/api/trips';
  private authUrl = 'http://localhost:3000/api';
  private refreshTrigger = new BehaviorSubject<void>(undefined);

  constructor(private http: HttpClient) {}

  // -----------------------------
  // AUTH
  // -----------------------------

  login(user: User, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authUrl}/login`, {
      email: user.email,
      name: user.name,
      password
    });
  }

  register(user: User, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authUrl}/register`, {
      email: user.email,
      name: user.name,
      password
    });
  }

  // -----------------------------
  // JWT HEADER
  // -----------------------------

  private authHeaders() {
    const token = localStorage.getItem('travlr-token');
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }

  // -----------------------------
  // PUBLIC TRIPS
  // -----------------------------

  getTrips(): Observable<Trip[]> {
    return this.refreshTrigger.pipe(
      switchMap(() => this.http.get<Trip[]>(this.tripsUrl))
    );
  }

  getTrip(tripId: string): Observable<Trip> {
    return this.http.get<any>(`${this.tripsUrl}/${tripId}`, this.authHeaders()).pipe(
      map(response => ({
        ...response,
        _id: response._id || response.id
      }) as Trip)
    );
  }

  // -----------------------------
  // ADMIN TRIPS (JWT REQUIRED)
  // -----------------------------

  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(
      this.tripsUrl,
      trip,
      this.authHeaders()
    );
  }

  updateTrip(tripId: string, trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(
      `${this.tripsUrl}/${tripId}`,
      trip,
      this.authHeaders()
    );
  }

  deleteTrip(tripId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.tripsUrl}/${tripId}`,
      this.authHeaders()
    );
  }

  triggerRefresh(): void {
    this.refreshTrigger.next();
  }
}
