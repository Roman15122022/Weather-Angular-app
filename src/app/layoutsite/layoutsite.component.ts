import {Component, ViewChild, AfterViewInit, ElementRef} from '@angular/core';
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-layoutsite',
  templateUrl: './layoutsite.component.html',
  styleUrls: ['./layoutsite.component.scss'],
})
export class LayoutSiteComponent implements AfterViewInit{
  onOff : boolean = false;
  @ViewChild('comp') compRef: ElementRef = new ElementRef(null);

  ngAfterViewInit() {
    this.checkOnOff();
  }

  checkOnOff() {
    const component = this.compRef.nativeElement;
    const theme = localStorage.getItem("theme");
    component.classList.add(theme);
    this.onOff = (theme === 'darkMode');
  }

  darkLight(event: MatSlideToggleChange) {
    const component = this.compRef.nativeElement;
    if (event.checked) {
      component.classList.add("darkMode");
      localStorage.setItem("theme", "darkMode");
    } else {
      component.classList.remove("darkMode");
      localStorage.setItem("theme", "light");
    }
  }
}

