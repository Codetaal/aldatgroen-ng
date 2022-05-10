import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { PlantListComponent } from './pages/plant/plant-list/plant-list.component';
import { PlantDetailsComponent } from './pages/plant/plant-details/plant-details.component';
import { EventListComponent } from './pages/event/event-list/event-list.component';
import { EventDetailsComponent } from './pages/event/event-details/event-details.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    PlantListComponent,
    PlantDetailsComponent,
    EventListComponent,
    EventDetailsComponent,
    CardComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
