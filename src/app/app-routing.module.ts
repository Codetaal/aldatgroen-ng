import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlantListComponent } from './pages/plant/plant-list/plant-list.component';
import { PlantDetailsComponent } from './pages/plant/plant-details/plant-details.component';
import { EventListComponent } from './pages/event/event-list/event-list.component';
import { EventDetailsComponent } from './pages/event/event-details/event-details.component';
import { MessageListComponent } from './pages/message/message-list/message-list.component';
import { MessageDetailsComponent } from './pages/message/message-details/message-details.component';

const routes: Routes = [
  { path: 'plants', component: PlantListComponent },
  { path: 'plants/:id', component: PlantDetailsComponent },
  { path: 'events', component: EventListComponent },
  { path: 'events/:id', component: EventDetailsComponent },
  { path: 'messages', component: MessageListComponent },
  { path: 'messages/:id', component: MessageDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
