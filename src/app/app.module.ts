import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/Utilities/home/home';
import { TabsPage } from '../pages/Utilities/tabs/tabs';
import { ClientListPage } from '../pages/Clients/client-list/client-list';
import { ProfilePage } from '../pages/Utilities/profile/profile';
import { LoginPage } from '../pages/Utilities/login/login';
import { AddClientPage } from '../pages/Clients/add-client/add-client';
import { ClientDetailsPage } from '../pages/Clients/client-details/client-details';
import { CalenderPage } from '../pages/Status/calender/calender';
import { TimelinePage } from '../pages/Status/timeline/timeline';
import { AddAMeetingPage } from '../pages/Activities/add-a-meeting/add-a-meeting';
import { AddPhoneCallPage } from '../pages/Activities/add-phone-call/add-phone-call';
import { CloseClientPage } from '../pages/Activities/close-client/close-client';
import { ClientEditPage } from '../pages/Clients/client-edit/client-edit';
import { ContactAdminPage } from '../pages/Contact/contact-admin/contact-admin';
import { ContactRepPage } from '../pages/Contact/contact-rep/contact-rep';
import { TimelineDetailPage } from '../pages/Status/timeline-detail/timeline-detail';
import { FinancePage } from '../pages/Utilities/finance/finance';

export const firebaseConfig=({
  apiKey: "AIzaSyDNBLBd2H_xJ3Ahhif0oZxaPJnXGK9nqUY",
  authDomain: "walk-in-crm.firebaseapp.com",
  databaseURL: "https://walk-in-crm.firebaseio.com",
  projectId: "walk-in-crm",
  storageBucket: "walk-in-crm.appspot.com",
  messagingSenderId: "278213082786"
})


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    ClientListPage,
    ProfilePage,
    LoginPage,
    AddClientPage,
    ClientDetailsPage,
    CalenderPage,
    TimelinePage,
    AddAMeetingPage,
    AddPhoneCallPage,
    CloseClientPage,
    ClientEditPage,
    ContactAdminPage,
    ContactRepPage,
    TimelineDetailPage,
    FinancePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      scrollAssist : false,
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    ClientListPage,
    ProfilePage,
    LoginPage,
    AddClientPage,
    ClientDetailsPage,
    CalenderPage,
    TimelinePage,
    AddAMeetingPage,
    AddPhoneCallPage,
    CloseClientPage,
    ClientEditPage,
    ContactAdminPage,
    ContactRepPage,
    TimelineDetailPage,
    FinancePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
