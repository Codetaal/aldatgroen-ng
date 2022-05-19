import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/interfaces/event';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  baseEvents: Event[] = [];
  reminders = [];
  form: FormGroup;

  constructor(
    private eventService: EventService,
    private router: Router,
    public formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      title: [''],
      description: [''],
      start_date: [''],
      repeat: [''],
      reminder: [''],
    });
  }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((response: any) => {
      this.baseEvents = response.data;

      this.createRecurringEvents();
      this.sortEventsByStartDate();
      this.loadReminders();
    });
  }

  createRecurringEvents(): void {
    this.events = [];

    this.baseEvents.forEach((event, index) => {
      for (let n = 0; n < environment.recurringAmount; n++) {
        const newEvent = { ...event };
        const startDate = new Date(newEvent.start_date);
        startDate.setDate(startDate.getDate() + parseInt(newEvent.repeat) * n);

        newEvent.start_date = startDate.toISOString();
        newEvent.cloneRefIndex = index;

        this.events.push(newEvent);
      }
    });
  }

  mutateBaseEvent(event: Event, data: any): void {
    this.baseEvents[event.cloneRefIndex] = data;
  }

  sortEventsByStartDate() {
    this.events.sort(
      (a, b) =>
        new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
    );
  }

  update(event: Event) {
    //TODO: only do if object has changes
    this.eventService.updateEvent(event).subscribe((response: any) => {
      this.mutateBaseEvent(event, response.data);
      this.createRecurringEvents();
      this.sortEventsByStartDate();
    });
  }

  submitForm() {
    this.eventService
      .createEvent(this.form.value)
      .subscribe((response: any) => {});
  }

  postpone(event: Event) {
    // make post service
    // reload event data
  }

  loadReminders(): void {
    this.events.forEach((event) => {
      const reminderDate = dayjs(event.start_date).subtract(
        parseInt(event.reminder),
        'day'
      );
      if (dayjs(reminderDate).isBefore(dayjs())) {
      }
    });
  }

  routeEventDetails(event: Event) {
    this.router.navigate(['events', event.id]);
  }
}
