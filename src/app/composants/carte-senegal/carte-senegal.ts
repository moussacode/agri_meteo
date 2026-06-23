import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MeteoStateService } from '../../services/service-meteo';


@Component({
  selector: 'app-carte-senegal',
  imports: [CommonModule],
  templateUrl: './carte-senegal.html',
  styleUrl: './carte-senegal.css',
})



export class CarteSenegal {
  hovered: string | null = null;
  mouseX = 0;
  mouseY = 0;

  constructor(
  private meteoState: MeteoStateService
) {}



  onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX + 10;
    this.mouseY = event.clientY + 10;
  }

  selectedRegion: string | null = null;

  selectRegion(region: string) {
    this.selectedRegion = region;
    console.log('Région sélectionnée :', region);
    this.meteoState.setRegion(region);
  }

  getRegionClass(region: string): string {

    // sélection PRIORITAIRE
    if (this.selectedRegion === region) {
      return 'fill-red-500';
    }

    // hover
    if (this.hovered === region) {
      return 'fill-[#3d7a4a]';
    }

    // défaut
    return 'fill-[#6f9c76]';
  }


  onMapClick(event: MouseEvent) {
    console.log('Click sur carte globale');
  }



}
