import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeteoStateService {

  selectedRegion = signal<string | null>(null);

  setRegion(region: string) {
    this.selectedRegion.set(region);
  }
}