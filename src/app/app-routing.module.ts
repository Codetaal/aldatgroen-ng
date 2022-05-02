import { PlantListComponent } from './plant-list/plant-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlantDetailsComponent } from './plant-details/plant-details.component';
import { EventListComponent } from './event-list/event-list.component';

const routes: Routes = [
  { path: 'plants', component: PlantListComponent },
  { path: 'plant/:id', component: PlantDetailsComponent },
  { path: 'events', component: EventListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
