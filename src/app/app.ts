import { Component, OnInit } from '@angular/core';
import { CarteSenegal } from "./composants/carte-senegal/carte-senegal";
import { PanneauMeteo } from "./composants/panneau-meteo/panneau-meteo";
import { GraphiqueClimatiqueComponent } from './composants/graphique-climatique/graphique-climatique';
import { IndicateurRisqueComponent } from './composants/indicateur-risque/indicateur-risque';
import { effect, inject } from '@angular/core';
import { MeteoStateService } from './services/service-meteo';

import { MeteoService } from './services/meteo-services';
import { GeolocalisationService } from './services/geolocalisation-services';
import { RisqueClimatiqueService, IndiceRisque } from './services/risqueclimatique-services';
import { HistoriqueMeteoService, JourMeteo } from './services/historiquemeteo-services';
import { NavBar } from "./composants/nav-bar/nav-bar";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CarteSenegal,
    PanneauMeteo,
    NavBar
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  
}
