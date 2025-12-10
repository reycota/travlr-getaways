import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

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
  private apiBaseUrl = 'http://localhost:3000/api/trips';
  private refreshTrigger = new BehaviorSubject<void>(undefined);

  constructor(private http: HttpClient) {}

  public getTrips(): Observable<Trip[]> {
    return this.refreshTrigger.pipe(
      switchMap(() => this.http.get<Trip[]>(this.apiBaseUrl))
    );
  }

  public getTrip(tripId: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiBaseUrl}/${tripId}`).pipe(
      timeout(5000),
      catchError(() => {
        throw new Error('Failed to load trip');
      })
    );
  }

  public addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.apiBaseUrl, trip);
  }

  public updateTrip(tripId: string, trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.apiBaseUrl}/${tripId}`, trip);
  }

  public deleteTrip(tripId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/${tripId}`);
  }

  public triggerRefresh(): void {
    this.refreshTrigger.next();
  }
}