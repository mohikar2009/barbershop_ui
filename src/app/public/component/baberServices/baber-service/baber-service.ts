import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { Header } from "../../../layout/header/header";
import { Footer } from "../../../layout/footer/footer";

@Component({
  selector: 'app-baber-service',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './baber-service.html',
  styleUrl: './baber-service.css',
})
export class BaberService {}
