import { Component, inject } from '@angular/core';
import { MeteoStateService } from '../../services/service-meteo';

@Component({
  selector: 'app-panneau-meteo',
  templateUrl: './panneau-meteo.html',
  styleUrl: './panneau-meteo.css'
})
export class PanneauMeteo {

  private meteoState = inject(MeteoStateService);
  close() {
  this.meteo.set(null);
  this.region.set(null)
}

  region = this.meteoState.selectedRegion;
  meteo = this.meteoState.meteo;
  loading = this.meteoState.loading;
  erreur = this.meteoState.erreur;

}