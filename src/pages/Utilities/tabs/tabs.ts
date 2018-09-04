import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { ClientListPage } from '../../Clients/client-list/client-list';
import { TimelinePage } from '../../Status/timeline/timeline';
import { FinancePage } from '../finance/finance';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = TimelinePage;
  tab2Root = FinancePage;
  tab3Root = HomePage;
  tab4Root = ClientListPage;
  tab5Root = ProfilePage;

  constructor() {

  }
}
