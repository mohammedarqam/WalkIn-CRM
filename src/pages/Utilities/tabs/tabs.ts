import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { ClientListPage } from '../../Clients/client-list/client-list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ClientListPage;
  tab3Root = ProfilePage;

  constructor() {

  }
}
