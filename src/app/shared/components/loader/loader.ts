import { AsyncPipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { LoaderService } from '../../../core/services/loader';

@Component({
  selector: 'app-loader',
  imports: [AsyncPipe],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader {
  @Input() loading: boolean | undefined;
  @Input() fullscreen = true;
  readonly loading$ = inject(LoaderService).loading$;
}
