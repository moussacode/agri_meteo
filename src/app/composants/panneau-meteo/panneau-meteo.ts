import { Component, effect, inject } from '@angular/core';
import { MeteoStateService } from '../../services/service-meteo';
import { MeteoService } from '../../services/meteo-services';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-panneau-meteo',
  templateUrl: './panneau-meteo.html',
  styleUrl: './panneau-meteo.css'
})
export class PanneauMeteo {

  private meteoState = inject(MeteoStateService);

  region = this.meteoState.selectedRegion;

  meteo: any = null;
  loading = false;
  erreur = '';

  constructor(
    private meteoService: MeteoService
  ) {

    effect(() => {
      const region = this.region();

      if (region) {
        this.chargerMeteo(region);
      }
    });

  }

  chargerMeteo(region: string) {

    this.loading = true;
    this.erreur = '';

    this.meteoService.obtenirMeteo(region).subscribe({

      next: (data) => {
        this.meteo = data;
        this.loading = false;
      },

      error: (err) => {
        this.erreur = err.message;
        this.loading = false;
      }

    });
  }
}