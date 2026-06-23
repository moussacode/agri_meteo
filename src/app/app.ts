import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MeteoService } from './services/meteo-services';
import { GeolocalisationService } from './services/geolocalisation-services';
import { RisqueClimatiqueService } from './services/risqueclimatique-services';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
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
