import {Component} from '@angular/core';
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-layoutsite',
  templateUrl: './layoutsite.component.html',
  styleUrls: ['./layoutsite.component.scss'],
})
export class LayoutSiteComponent {
  darkLight(event: MatSlideToggleChange) {
    const toolBar = document.getElementsByClassName('bg')[0];
    toolBar.classList.remove('bg');
    if (event.checked) {
      toolBar.classList.add('dark-theme');
    } else {
      toolBar.classList.remove('dark-theme')
    }
  }
}

