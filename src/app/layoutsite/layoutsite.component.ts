import {Component} from '@angular/core';
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-layoutsite',
  templateUrl: './layoutsite.component.html',
  styleUrls: ['./layoutsite.component.scss'],
})
export class LayoutSiteComponent {
  darkLight(event: MatSlideToggleChange) {
    const header = document.getElementsByTagName("mat-toolbar")[0];
    const body = document.getElementsByTagName("mat-drawer-container")[0];
    if (event.checked) {
      header.classList.add("darkMode");
      body.classList.add("darkMode");
    } else {
      header.classList.remove("darkMode");
      body.classList.remove("darkMode");
    }
  }
}

