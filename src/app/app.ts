import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarteSenegal } from "./composants/carte-senegal/carte-senegal";
import { PanneauMeteo } from "./composants/panneau-meteo/panneau-meteo";

@Component({
  selector: 'app-root',
  imports: [CarteSenegal, PanneauMeteo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('agri_meteo');
}
