import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlantListComponent } from './pages/plant/plant-list/plant-list.component';
import { PlantDetailsComponent } from './pages/plant/plant-details/plant-details.component';
import { EventListComponent } from './pages/event-list/event-list.component';

const routes: Routes = [
  { path: 'plants', component: PlantListComponent },
  { path: 'plants/:id', component: PlantDetailsComponent },
  { path: 'events', component: EventListComponent },
  // { path: 'events/:id', component: EventDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
