import { inject, Injectable, signal, effect } from '@angular/core';
import { MeteoService } from './meteo-services';

@Injectable({ providedIn: 'root' })
export class MeteoStateService {

  private meteoService = inject(MeteoService);

  selectedRegion = signal<string | null>(null);

  meteo = signal<any>(null);
  loading = signal(false);
  erreur = signal('');

  constructor() {

    effect(() => {
      const region = this.selectedRegion();

      if (!region) return;

      this.loading.set(true);
      this.erreur.set('');

      this.meteoService.obtenirMeteo(region).subscribe({
        next: (data) => {
          this.meteo.set(data);
          this.loading.set(false);
        },
        error: (err) => {
          this.erreur.set(err.message);
          this.loading.set(false);
        }
      });

    });

  }

  setRegion(region: string) {
    this.selectedRegion.set(region);
  }
}