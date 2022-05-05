import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {
  events!: any;

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((data) => {
      this.events = data;
    });
  }

  routeEventDetails(id: number) {
    this.router.navigate(['events', id]);
  }
}
