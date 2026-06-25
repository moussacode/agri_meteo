import { Component, effect, inject, OnInit } from '@angular/core';
import { MeteoStateService } from '../../services/service-meteo';
import { MeteoService } from '../../services/meteo-services';
import { GeolocalisationService } from '../../services/geolocalisation-services';
import { IndiceRisque, RisqueClimatiqueService } from '../../services/risqueclimatique-services';
import { HistoriqueMeteoService, JourMeteo } from '../../services/historiquemeteo-services';
import { GraphiqueClimatiqueComponent } from "../graphique-climatique/graphique-climatique";
import { IndicateurRisqueComponent } from "../indicateur-risque/indicateur-risque";

@Component({
  selector: 'app-panneau-meteo',
  templateUrl: './panneau-meteo.html',
  styleUrl: './panneau-meteo.css',
  imports: [GraphiqueClimatiqueComponent, IndicateurRisqueComponent]
})
export class PanneauMeteo implements OnInit  {

  private meteoState = inject(MeteoStateService);

  close() {
  this.meteo.set(null);
  this.region.set(null)
}

  region = this.meteoState.selectedRegion;
  meteo = this.meteoState.meteo;
  loading = this.meteoState.loading;
  erreur = this.meteoState.erreur;

  historique: JourMeteo[] = [];
    indice!: IndiceRisque;
    
    constructor(
    private meteo2: MeteoService,
    private geo: GeolocalisationService,
    private risque: RisqueClimatiqueService,
    private historiqueService: HistoriqueMeteoService
  ) {
  
    effect(() => {
  
      const region = this.meteoState.selectedRegion();
  
      if (!region) return;
  
      this.chargerDonnees(region);
  
    });
  
  }
  chargerDonnees(ville: string) {
  
    this.meteo2.obtenirMeteo(ville).subscribe(donnees => {
  
      this.historique = this.historiqueService.genererHistorique(
        donnees.temperature,
        donnees.humidite
      );
  
      this.indice = this.risque.calculerIndiceRisque(
        donnees.temperature,
        donnees.humidite
      );
  
    });
  
  }
  
    // Un seul ngOnInit, un seul appel API
    async ngOnInit() {
    try {
      const position = await this.geo.obtenirPosition();
      this.chargerDonnees(position.ville);
    } catch (error) {
      console.error('Erreur de géolocalisation', error);
    }
  }
  
}