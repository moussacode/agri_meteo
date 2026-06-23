import { Component, computed, inject } from '@angular/core';
import { MeteoStateService } from '../../services/service-meteo';

@Component({
  selector: 'app-panneau-meteo',
  templateUrl: './panneau-meteo.html',
  styleUrl: './panneau-meteo.css'
})
export class PanneauMeteo {

  meteoState = inject(MeteoStateService);

  region = this.meteoState.selectedRegion;

  meteo = computed(() => {

    const region = this.region();

    if (!region) return null;

    
    console.log(region)
    return region;
  });
}