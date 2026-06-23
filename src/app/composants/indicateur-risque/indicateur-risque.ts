import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndiceRisque } from '../../services/risqueclimatique-services';

@Component({
  selector: 'app-indicateur-risque',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './indicateur-risque.html',
  styleUrl: './indicateur-risque.css'
})
export class IndicateurRisqueComponent {

  // Reçoit l'indice calculé par RisqueClimatiqueService
  @Input() indice!: IndiceRisque;

  // Les 4 niveaux pour la jauge visuelle
  niveaux = [
    { niveau: 'faible',   emoji: '🟢', label: 'Faible',   seuil: 25  },
    { niveau: 'modere',   emoji: '🟡', label: 'Modéré',   seuil: 50  },
    { niveau: 'eleve',    emoji: '🟠', label: 'Élevé',    seuil: 75  },
    { niveau: 'critique', emoji: '🔴', label: 'Critique', seuil: 100 }
  ];

  // Retourne true si ce niveau est le niveau actuel
  estActif(niveau: string): boolean {
    return this.indice?.niveau === niveau;
  }

  // Calcule la largeur de la barre de progression (0% → 100%)
  get largeurJauge(): string {
    return `${this.indice?.score ?? 0}%`;
  }
}