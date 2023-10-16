import {Component} from '@angular/core';
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-layoutsite',
  templateUrl: './layoutsite.component.html',
  styleUrls: ['./layoutsite.component.scss'],
})
export class LayoutSiteComponent {
  darkLight(event: MatSlideToggleChange) {
    if (event.checked) {

    } else {

    }
  }
}

