import { Routes } from '@angular/router';
import { TripList } from './trip-list/trip-list';
import { TripAdd } from './trip-add/trip-add';
import { TripEdit } from './trip-edit/trip-edit';

export const routes: Routes = [
  { path: '', component: TripList },
  { path: 'add', component: TripAdd },
  { path: 'edit/:tripId', component: TripEdit },
];
