import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {WidgetComponent} from "./widget/widget.component";
import {LayoutSiteComponent} from "./layoutsite/layoutsite.component";
import {YourCityComponent} from "./yourcity/yourcity.component";


const routes: Routes = [
  {
    path: '', component: LayoutSiteComponent,
    children: [
      {path: '', redirectTo: '/home', pathMatch: 'full'},
      {path: 'home', component: YourCityComponent},
      {path: 'widgets', component: WidgetComponent}
    ]
  },
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
