import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimelineDetailPage } from './timeline-detail';

@NgModule({
  declarations: [
    TimelineDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TimelineDetailPage),
  ],
})
export class TimelineDetailPageModule {}
