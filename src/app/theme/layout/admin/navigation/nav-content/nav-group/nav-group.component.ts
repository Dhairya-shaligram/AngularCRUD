// angular import
import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

// project import
import { NavigationItem } from '../../navigation';

@Component({
  selector: 'app-nav-group',
  templateUrl: './nav-group.component.html',
  styleUrls: ['./nav-group.component.css'],
})
export class NavGroupComponent implements OnInit {
  // public props
  @Input() item?: NavigationItem;

  // constructor
  constructor(private location: Location) {}

  // life cycle event
  ngOnInit() {
    const current_url = this.location.path(); // Get the current path

    const link = "a.nav-link[href='" + current_url + "']"; 
    const ele = document.querySelector(link);

    if (ele) {
      const parent = ele.parentElement;
      const up_parent = parent?.parentElement?.parentElement;
      const last_parent = up_parent?.parentElement;

      if (parent?.classList.contains('pcoded-hasmenu')) {
        parent.classList.add('pcoded-trigger', 'active');
      } else if (up_parent?.classList.contains('pcoded-hasmenu')) {
        up_parent.classList.add('pcoded-trigger', 'active');
      } else if (last_parent?.classList.contains('pcoded-hasmenu')) {
        last_parent.classList.add('pcoded-trigger', 'active');
      }
    }
  }
}
