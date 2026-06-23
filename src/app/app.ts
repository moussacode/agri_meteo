import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarteSenegal } from "./composants/carte-senegal/carte-senegal";
import { PanneauMeteo } from "./composants/panneau-meteo/panneau-meteo";
import { MeteoService } from './services/meteo-services';
import { GeolocalisationService } from './services/geolocalisation-services';
import { RisqueClimatiqueService } from './services/risqueclimatique-services';


@Component({
  selector: 'app-root',
  imports: [CarteSenegal, PanneauMeteo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(
  private meteo: MeteoService,
  private geo: GeolocalisationService,
  private risque: RisqueClimatiqueService
) {}

// Exemple d'utilisation :
async ngOnInit() {
  const position = await this.geo.obtenirPosition();
  
  this.meteo.obtenirMeteo(position.ville).subscribe(donnees => {
    const indice = this.risque.calculerIndiceRisque(
      donnees.temperature,
      donnees.humidite
    );
    console.log('Risque:', indice);
  });
}
}
