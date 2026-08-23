import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dashboard } from "./component/dashboard/dashboard";
import { Home } from "./component/home/home";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Dashboard, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
