import { environment } from 'src/environments/environment';
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
  // recurring: number = 1;

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((data: Event[]) => {
      this.events = data;
      this.addRecurringEvents(this.events);
      this.sortEventsByStartDate(this.events);
    });
  }

  addRecurringEvents(events: Event[]) {
    events.forEach((event) => {
      for (let n = 1; n <= environment.recurringAmount; n++) {
        let eventData = { ...event };
        let startDate = new Date(eventData.startDate);
        startDate.setDate(startDate.getDate() + parseInt(eventData.repeat) * n);

        eventData.startDate = startDate.toISOString();

        events.push(eventData);
      }
    });
  }

  sortEventsByStartDate(events: Event[]) {
    events.sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
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
