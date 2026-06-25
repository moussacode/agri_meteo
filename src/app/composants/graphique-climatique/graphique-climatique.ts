import { Component, Input, OnChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { JourMeteo } from '../../services/historiquemeteo-services';

// Enregistre tous les modules Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-graphique-climatique',
  standalone: true,
  templateUrl: './graphique-climatique.html',
  styleUrl: './graphique-climatique.css'
})
export class GraphiqueClimatiqueComponent implements AfterViewInit, OnChanges {

  // Données reçues depuis le composant parent
  @Input() historique: JourMeteo[] = [];

  // Référence directe à l'élément <canvas> dans le HTML
  @ViewChild('monCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private chart: Chart | null = null;

  // S'exécute quand le HTML est prêt
  ngAfterViewInit() {
    this.creerGraphique();
  }

  // S'exécute quand @Input() historique change
  ngOnChanges() {
    if (this.chart) {
      this.mettreAJour();
    }
  }

  private creerGraphique() {
    const ctx = this.canvasRef.nativeElement.getContext('2d')!;

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.historique.map(j => j.date),
        datasets: [
          {
            label: 'Température (°C)',
            data: this.historique.map(j => j.temperature),
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239,68,68,0.1)',
            tension: 0.4,   // courbe lisse
            fill: true,
            yAxisID: 'yTemp'
          },
          {
            label: 'Humidité (%)',
            data: this.historique.map(j => j.humidite),
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59,130,246,0.1)',
            tension: 0.4,
            fill: true,
            yAxisID: 'yHumidite'
          }
        ]
      },
      options: {
        responsive: true,
        interaction: { mode: 'index', intersect: false },
        scales: {
          yTemp: {
            type: 'linear',
            position: 'left',
            title: { display: true, text: '°C' }
          },
          yHumidite: {
            type: 'linear',
            position: 'right',
            min: 0,
            max: 100,
            title: { display: true, text: '%' },
            grid: { drawOnChartArea: false } // évite les grilles qui se superposent
          }
        }
      }
    });
  }

  // Met à jour le graphique sans le recréer
  private mettreAJour() {
    if (!this.chart) return;

    this.chart.data.labels = this.historique.map(j => j.date);
    this.chart.data.datasets[0].data = this.historique.map(j => j.temperature);
    this.chart.data.datasets[1].data = this.historique.map(j => j.humidite);
    this.chart.update();
  }
}