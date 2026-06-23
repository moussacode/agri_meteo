import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";

export interface DonneesMeteo {

    ville: string;
    temperature: number;
    humidite: number;
    description: string;
    icone: string;

}

@Injectable({
    providedIn: 'root'
})

export class MeteoService{
    private readonly Cle_Api = "42982dedae6db57558285b836484c430";
    private readonly Url_Base ="https://api.openweathermap.org/data/2.5/weather";
    
    constructor(private http: HttpClient){}

    obtenirMeteo(ville: string): Observable<DonneesMeteo>{
        const url = `${this.Url_Base}?q=${ville}&appid=${this.Cle_Api}&units=metric&lang=fr`;
        return this.http.get<any>(url).pipe(map(reponse => this.transformerDonnees(reponse)), 
        catchError(erreur => this.gererErreur(erreur))
    );
    }


    private transformerDonnees(data: any): DonneesMeteo{
        return{

            ville: data.name,
            temperature: Math.round(data.main.temp),
            humidite: data.main.humidity,
            description: data.weather[0].description,
            icone: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            };
  
        }
// Gère les erreurs HTTP et retourne un message clair
  private gererErreur(erreur: any): Observable<never> {
    let message = 'Erreur inconnue';

    if (erreur.status === 404) {
      message = 'Ville introuvable';
    } else if (erreur.status === 401) {
      message = 'Clé API invalide';
    } else if (erreur.status === 0) {
      message = 'Pas de connexion internet';
    }

    console.error('MeteoService:', message, erreur);
    return throwError(() => new Error(message));
  }
}
    




