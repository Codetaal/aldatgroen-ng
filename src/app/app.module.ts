import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PlantListComponent } from './pages/plant/plant-list/plant-list.component';
import { PlantDetailsComponent } from './pages/plant/plant-details/plant-details.component';
import { EventListComponent } from './pages/event/event-list/event-list.component';
import { EventDetailsComponent } from './pages/event/event-details/event-details.component';
import { CardComponent } from './components/card/card.component';
import { LoaderInterceptor } from './interceptors/loading.interceptor';
import { LoaderComponent } from './components/loader/loader.component';
import { MessageListComponent } from './pages/message/message-list/message-list.component';
import { MessageDetailsComponent } from './pages/message/message-details/message-details.component';

@NgModule({
  declarations: [
    AppComponent,
    PlantListComponent,
    PlantDetailsComponent,
    EventListComponent,
    EventDetailsComponent,
    CardComponent,
    LoaderComponent,
    MessageListComponent,
    MessageDetailsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
