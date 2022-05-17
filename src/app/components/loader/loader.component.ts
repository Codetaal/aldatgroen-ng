import { Component } from '@angular/core';

import { LoadingService } from '../../services/loader.service';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  isLoading: boolean = false;

  constructor(public loadingService: LoadingService) {
    this.loadingService.showLoading.subscribe(this.showLoading.bind(this));
  }

  showLoading = (state: boolean): void => {
    this.isLoading = state;
  };
}
