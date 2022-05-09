import { Router } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/interfaces/event';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {
  events!: Event[];
  amount!: string;

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((data: Event[]) => {
      this.events = data;
      this.extendEvents(this.events);
    });
  }

  extendEvents(events: Event[]) {
    let repeatedEvents = [] as Event[];

    events.forEach((event) => {
      let eventData = {} as Event;
      eventData = event;

      // let yourDate = new Date(eventData.startDate);
      // eventData.startDate = yourDate.setDate(yourDate.getDate() + 1).toString();

      repeatedEvents.push(eventData);
    });

    console.log(repeatedEvents);
  }

  routeEventDetails(id: number) {
    this.router.navigate(['events', id]);
  }

  postpone(id: number, amount: string) {
    console.log(id, amount);
    // reload event data
  }

  repeat(id: number, amount: string) {
    console.log(id, amount);
    // reload event data
  }
}
