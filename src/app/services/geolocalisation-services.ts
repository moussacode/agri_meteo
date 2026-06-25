import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface Position {
  ville: string;
  latitude: number;
  longitude: number;
  region: string;
}

@Injectable({
  providedIn: 'root'
})
export class GeolocalisationService {

  private readonly CLE_API = "42982dedae6db57558285b836484c430"; // même clé que MeteoService
  private readonly URL_GEO = 'https://api.openweathermap.org/geo/1.0/reverse';

  private readonly FALLBACK: Position = {
    ville: 'Paris',
    latitude: 14.6928,
    longitude: -17.4467,
    region: 'Dakar'
  };

  constructor(private http: HttpClient) {} // on injecte HttpClient

  async obtenirPosition(): Promise<Position> {
    if (!navigator.geolocation) {
      
      return this.FALLBACK;
    }
    
   return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        // Succès GPS → on appelle l'API OpenWeatherMap pour avoir le nom
        async (position) => {
          
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          try {
            const ville = await this.coordonneesVersVille(lat, lon);
            resolve({ ville, latitude: lat, longitude: lon, region: ville });

            console.log(ville)
            console.log(lat)
            console.log(lon)

            
          } catch {
            // Si l'API échoue, fallback Dakar
            resolve(this.FALLBACK);
          }
        },
        // Échec GPS → fallback Dakar
        () => resolve(this.FALLBACK),
        { timeout: 10000 }
      );
    });
  }

  // Appelle l'API OpenWeatherMap Reverse Geocoding
  // Coordonnées GPS → nom de ville
  private async coordonneesVersVille(lat: number, lon: number): Promise<string> {
    const url = `${this.URL_GEO}?lat=${lat}&lon=${lon}&limit=1&appid=${this.CLE_API}`;

    // firstValueFrom convertit l'Observable HttpClient en Promise
    const resultats = await firstValueFrom(this.http.get<any[]>(url));

    if (resultats && resultats.length > 0) {
      // L'API retourne le nom local si disponible, sinon le nom anglais
      return resultats[0].local_names?.fr || resultats[0].name || 'Dakar';
    }

    throw new Error('Ville introuvable');
  }
}