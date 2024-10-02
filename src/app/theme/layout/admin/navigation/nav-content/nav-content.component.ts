// angular import
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';

// project import
import { NavigationItem } from '../navigation';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav-content',
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.css'],
})
export class NavContentComponent implements OnInit {

  title = 'Demo application for version numbe ring';
  currentApplicationVersion = environment.appVersion;
  @Output() onNavCollapsedMob = new EventEmitter();
  navigation: any;
  windowWidth: number;

  constructor(
    public nav: NavigationItem,
    private location: Location,
  ) {
    this.windowWidth = window.innerWidth;
    this.navigation = this.nav.get();
  }

  // life cycle event
  ngOnInit() {
    if (this.windowWidth < 992) {
      setTimeout(() => {
        const navbar = document.querySelector('.pcoded-navbar');
        if (navbar) {
          navbar.classList.add('menupos-static');
        }
  
        const navElement = document.querySelector('#nav-ps-datta') as HTMLElement;
        if (navElement) {
          navElement.style.maxHeight = '100%';
        }
      }, 500);
    }
  }

  // public method
  navMob() {
    if (this.windowWidth < 992) {
      const navbar = document.querySelector('app-navigation.pcoded-navbar');
      if (navbar && navbar.classList.contains('mob-open')) {
        this.onNavCollapsedMob.emit();
      }
    }
  }

  fireOutClick() {
    let current_url = this.location.path();
    const baseHref = (this.location as any)._baseHref || ''; 
    current_url = baseHref + current_url;
    const link = "a.nav-link[ href='" + current_url + "' ]";
    const ele = document.querySelector(link);
    if (ele !== null && ele !== undefined) {
      const parent = ele.parentElement;
      const up_parent = parent?.parentElement?.parentElement;
      const last_parent = up_parent!.parentElement;
      if (parent?.classList.contains('pcoded-hasmenu')) {
        parent?.classList.add('pcoded-trigger');
        parent?.classList.add('active');
      } else if (up_parent?.classList.contains('pcoded-hasmenu')) {
        up_parent!.classList.add('pcoded-trigger');
        up_parent!.classList.add('active');
      } else if (last_parent?.classList.contains('pcoded-hasmenu')) {
        last_parent?.classList.add('pcoded-trigger');
        last_parent?.classList.add('active');
      }
    }
  }
}
