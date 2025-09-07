import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { LoaderService } from '../../services/loader.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [MaterialModule, AsyncPipe],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  loaderService = inject(LoaderService);
}
