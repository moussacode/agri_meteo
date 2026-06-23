import { Injectable } from '@angular/core';

// Interface : le résultat du calcul de risque
export interface IndiceRisque {
  score: number;        // 0 à 100
  niveau: 'faible' | 'modere' | 'eleve' | 'critique';
  couleur: string;      // code couleur hex
  message: string;      // explication courte
}

@Injectable({
  providedIn: 'root'
})
export class RisqueClimatiqueService {

  // Méthode principale demandée dans les specs
  calculerIndiceRisque(temperature: number, humidite: number): IndiceRisque {

    // Calcul du score sur 100
    // - Température : risque si > 35°C (zone sahélienne)
    // - Humidité : risque si > 80% (favorise maladies)
    const scoreTemp = this.calculerScoreTemperature(temperature);
    const scoreHumidite = this.calculerScoreHumidite(humidite);

    // Score final = 60% température + 40% humidité (pondération)
    const score = Math.round(scoreTemp * 0.6 + scoreHumidite * 0.4);

    // Attribution du niveau selon le score
    return {
      score,
      ...this.determinerNiveau(score)
    };
  }

  // Score de 0 à 100 basé sur la température
  private calculerScoreTemperature(temp: number): number {
    if (temp <= 25) return 10;
    if (temp <= 35) return 25;
    if (temp <= 40) return 50;
    if (temp <= 45) return 75;
    return 100; // > 38°C = danger maximal
  }

  // Score de 0 à 100 basé sur l'humidité
  private calculerScoreHumidite(humidite: number): number {
    if (humidite <= 40) return 10;
    if (humidite <= 60) return 30;
    if (humidite <= 75) return 55;
    if (humidite <= 85) return 75;
    return 100; // > 85% = danger maximal
  }

  // Détermine le niveau, la couleur et le message selon le score
  private determinerNiveau(score: number) {
    if (score <= 25) {
      return {
        niveau: 'faible' as const,
        couleur: '#22c55e',   // vert
        message: 'Conditions climatiques favorables'
      };
    }
    if (score <= 50) {
      return {
        niveau: 'modere' as const,
        couleur: '#f59e0b',   // orange
        message: 'Restez hydraté et évitez le soleil aux heures chaudes'
      };
    }
    if (score <= 75) {
      return {
        niveau: 'eleve' as const,
        couleur: '#ef4444',   // rouge
        message: 'Risque élevé, limitez les activités extérieures'
      };
    }
    return {
      niveau: 'critique' as const,
      couleur: '#7c3aed',     // violet
      message: 'Danger critique, restez à l\'intérieur'
    };
  }
}