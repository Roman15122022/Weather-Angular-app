import {Component, OnInit} from '@angular/core';
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-layoutsite',
  templateUrl: './layoutsite.component.html',
  styleUrls: ['./layoutsite.component.scss'],
})
export class LayoutSiteComponent implements OnInit{
  onOff : boolean = false;
  ngOnInit() {
    this.checkOnOff();
  }

  checkOnOff() {
    const header = document.getElementsByTagName("mat-toolbar")[0];
    const body = document.getElementsByTagName("mat-drawer-container")[0];
    if (localStorage.getItem("theme") === "dark") {
      header.classList.add("darkMode");
      body.classList.add("darkMode");
      this.onOff = true;
    } else if (localStorage.getItem("theme") === "light") {
      header.classList.remove("darkMode");
      body.classList.remove("darkMode");
      this.onOff = false;
    }
  }

  darkLight(event: MatSlideToggleChange) {
    const header = document.getElementsByTagName("mat-toolbar")[0];
    const body = document.getElementsByTagName("mat-drawer-container")[0];
    if (event.checked) {
      header.classList.add("darkMode");
      body.classList.add("darkMode");

      localStorage.setItem("theme", "dark");
      console.log(localStorage.getItem("theme"));
    } else {
      header.classList.remove("darkMode");
      body.classList.remove("darkMode");
      localStorage.setItem("theme", "light");
      console.log(localStorage.getItem("theme"));
    }
  }
}

