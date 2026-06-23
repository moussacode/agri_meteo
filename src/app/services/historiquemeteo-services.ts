import { Injectable } from '@angular/core';

// Interface : données d'un jour
export interface JourMeteo {
  date: string;        // un jour dans la semaine 
  temperature: number;
  humidite: number;
}

@Injectable({
  providedIn: 'root'
})
export class HistoriqueMeteoService {

  // Génère les 7 derniers jours autour de la température actuelle
  genererHistorique(temperatureActuelle: number, humiditeActuelle: number): JourMeteo[] {
    const historique: JourMeteo[] = [];
    const jours = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i); // recule de i jours

      const jour = jours[date.getDay()];
      const numero = date.getDate();

      // Variation aléatoire cohérente : ±4°C autour de la temp actuelle
      const variationTemp = (Math.random() * 8) - 4;
      // Variation aléatoire cohérente : ±10% autour de l'humidité actuelle
      const variationHumidite = (Math.random() * 20) - 10;

      historique.push({
        date: `${jour} ${numero}`,
        temperature: Math.round(temperatureActuelle + variationTemp),
        humidite: Math.min(100, Math.max(0, Math.round(humiditeActuelle + variationHumidite)))
      });
    }

    return historique;
  }
}