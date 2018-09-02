import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { ClientListPage } from '../../Clients/client-list/client-list';
import { TimelinePage } from '../../Status/timeline/timeline';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ClientListPage;
  tab3Root = TimelinePage;
  tab4Root = ProfilePage;

  constructor() {

  }
}
