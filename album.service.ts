import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from './environments/environment'
import { album } from './app/album';
import { catchError, map, retry, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class albumService {

  private dataUri = `${environment.apiUri}/api/albums`;

  constructor(private http: HttpClient) { }

  getalbums(): Observable<album[]> {

    console.log("get albums called" );

    return this.http.get<album[]>(`${this.dataUri}`)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );

  }

  getalbum(id: String): Observable<album> {

    console.log("get albums called" );

    return this.http.get<album>(`${this.dataUri}/${id}`)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );

  }

  getByTitle(title:string): Observable<album[]> {
    console.log("get albums specifit title " );
    return this.http.get<album[]>('http://localhost:3000/api/albums?title='+title)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  
  addalbum(album: album): Observable<album> {
    return this.http.post<album>(this.dataUri, album)
      .pipe(
        catchError(this.handleError)
      )
  }

  updatealbum(id: string, album: album): Observable<album> {
    console.log('subscribing to update' + id);
    let albumURI: string = this.dataUri + '/' + id;
    return this.http.put<album>(albumURI, album)
      .pipe(
        catchError(this.handleError)
      )
  }

  deletealbum(id: string): Observable<unknown> {
    const url = `${this.dataUri}/${id}`; // DELETE 
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }


 

}



