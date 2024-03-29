import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.css'
})
export class LoadingSpinnerComponent {

  loading$ = this.loadingService.loading$;

  constructor(private loadingService: LoadingService) { }
  
  ngOnInit() { }


}
