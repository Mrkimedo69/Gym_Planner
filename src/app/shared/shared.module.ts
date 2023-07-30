import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './components/alert/alert.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './directives/placeholder.directive';
import { DropdownDirective } from './directives/dropdown.directive';
import { LoggingService } from '../core/services/logging.service';
import { SafePipe } from './pipes/safeulr.pipe';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { VideoComponent } from './components/video/video.component';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    SafePipe,
    VideoComponent
  ],
  imports: [CommonModule,NgxYoutubePlayerModule.forRoot()],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    CommonModule,
    SafePipe,
    VideoComponent
  ],
  entryComponents: [AlertComponent],
  providers: [LoggingService]
})
export class SharedModule {}
