import { Component, OnInit } from '@angular/core';
import { CarteSenegal } from "./composants/carte-senegal/carte-senegal";
import { PanneauMeteo } from "./composants/panneau-meteo/panneau-meteo";
import { GraphiqueClimatiqueComponent } from './composants/graphique-climatique/graphique-climatique';
import { IndicateurRisqueComponent } from './composants/indicateur-risque/indicateur-risque';

import { MeteoService } from './services/meteo-services';
import { GeolocalisationService } from './services/geolocalisation-services';
import { RisqueClimatiqueService, IndiceRisque } from './services/risqueclimatique-services';
import { HistoriqueMeteoService, JourMeteo } from './services/historiquemeteo-services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CarteSenegal,
    PanneauMeteo,
    GraphiqueClimatiqueComponent,   // ← ajouté
    IndicateurRisqueComponent       // ← ajouté
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  historique: JourMeteo[] = [];
  indice!: IndiceRisque;

  constructor(
    private meteo: MeteoService,
    private geo: GeolocalisationService,
    private risque: RisqueClimatiqueService,
    private historiqueService: HistoriqueMeteoService
  ) {}

  // Un seul ngOnInit, un seul appel API
  async ngOnInit() {
    const position = await this.geo.obtenirPosition();

    this.meteo.obtenirMeteo(position.ville).subscribe(donnees => {
      // Tout est regroupé ici dans un seul subscribe
      this.historique = this.historiqueService.genererHistorique(
        donnees.temperature,
        donnees.humidite
      );
      this.indice = this.risque.calculerIndiceRisque(
        donnees.temperature,
        donnees.humidite
      );

      console.log('Risque:', this.indice);
    });
  }
}