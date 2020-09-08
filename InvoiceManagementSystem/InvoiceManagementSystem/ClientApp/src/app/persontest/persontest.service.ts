import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { IPersonTest } from './persontest';

@Injectable({
  providedIn: 'root'
})
export class PersontestService {

  private personTestUrl = 'api/PersonTest';
  private personTests: IPersonTest[];

  constructor(private http: HttpClient) { }

  getPersonTests(): Observable<IPersonTest[]> {
    if (this.personTests) {
      return of(this.personTests);
    }
    return this.http.get<IPersonTest[]>(this.personTestUrl)
      .pipe(
        tap(data => console.log('All PersonTests', JSON.stringify(data))),
        tap(data => this.personTests = data),
        catchError(this.handleError)
      );
  }

  getPersonTest(id: number): Observable<IPersonTest> {
    if (id === 0) {
      return of(this.initializePersonTest());
    }
    if (this.personTests) {
      const foundItem = this.personTests.find(item => item.personTestId === id);
      if (foundItem) {
        return of(foundItem);
      }
    }
    const url = `${this.personTestUrl}/${id}`;
    return this.http.get<IPersonTest>(url)
      .pipe(
        tap(data => console.log('Single PersonTest: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  savePersonTest(personTest: IPersonTest): Observable<IPersonTest> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (personTest.personTestId === 0) {
      return this.createPersonTest(personTest, headers);
    }
    return this.updatePersonTest(personTest, headers);
  }

  deletePersonTest(id: number): Observable<IPersonTest> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.personTestUrl}/${id}`;
    return this.http.delete<IPersonTest>(url, { headers })
      .pipe(
        tap(data => console.log('deletePersonTest: ' + id)),
        tap(data => {
          const foundIndex = this.personTests.findIndex(item => item.personTestId === id);
          if (foundIndex > -1) {
            this.personTests.splice(foundIndex, 1);
            //this.changeSelectedProduct(null);
          }
        }),
        catchError(this.handleError)
      );
  }

  private createPersonTest(personTest: IPersonTest, headers: HttpHeaders): Observable<IPersonTest> {
    personTest.personTestId = null;
    return this.http.post<IPersonTest>(this.personTestUrl, personTest, { headers })
      .pipe(
        tap(data => console.log('createPersonTest: ' + JSON.stringify(data))),
        tap(data => {
          // If the user selected to add before listing the personTests,
          // The personTests won't yet be retrieved.
          if (this.personTests) {
            this.personTests.push(data);
          }
          //this.changeSelectedProduct(data);
        }),
        catchError(this.handleError)
      );
  }

  private updatePersonTest(personTest: IPersonTest, headers: HttpHeaders): Observable<IPersonTest> {
    const url = `${this.personTestUrl}/${personTest.personTestId}`;
    return this.http.put<IPersonTest>(url, personTest, { headers })
      .pipe(
        tap(data => console.log('updatePersonTest: ' + personTest.personTestId)),
        catchError(this.handleError)
      );
  }

  private initializePersonTest(): IPersonTest {
    // Return an initialized object
    return {
      personTestId: 0,
      firstName: '',
      lastName:''
    };
  }


  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}, body was: ${err.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
