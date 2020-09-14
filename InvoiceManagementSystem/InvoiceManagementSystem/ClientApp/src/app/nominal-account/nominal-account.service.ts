import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";

import { Observable, of, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { NominalAccount } from "./nominal-account";

@Injectable({
  providedIn: "root",
})
export class NominalAccountService {
  private nominalAccountUrl = "api/nominalaccount";
  private nominalAccounts: NominalAccount[];

  constructor(private http: HttpClient) {}

  getNominalAccounts(): Observable<NominalAccount[]> {
    if (this.nominalAccounts) {
      return of(this.nominalAccounts);
    }

    return this.http.get<NominalAccount[]>(this.nominalAccountUrl).pipe(
      tap((data) => console.log("All NominalAccounts", JSON.stringify(data))),
      tap((data) => (this.nominalAccounts = data)),
      catchError(this.handleError)
    );
  }

  getNominalAccount(id: number): Observable<NominalAccount> {
    if (id === 0) {
      return of(this.initializeNominalAccount());
    }
    if (this.nominalAccounts) {
      const foundItem = this.nominalAccounts.find(
        (item) => item.nominalAccountId === id
      );
      if (foundItem) {
        return of(foundItem);
      }
    }
    const url = `${this.nominalAccountUrl}/${id}`;
    return this.http.get<NominalAccount>(url).pipe(
      tap((data) =>
        console.log("Single NominalAccount: " + JSON.stringify(data))
      ),
      catchError(this.handleError)
    );
  }

  saveNominalAccount(
    nominalAccount: NominalAccount
  ): Observable<NominalAccount> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    if (nominalAccount.nominalAccountId === 0) {
      return this.createNominalAccount(nominalAccount, headers);
    }
    return this.updateNominalAccount(nominalAccount, headers);
  }

  deleteNominalAccount(id: number): Observable<NominalAccount> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const url = `${this.nominalAccountUrl}/${id}`;
    return this.http
      .delete<NominalAccount>(url, { headers })
      .pipe(
        tap((data) => console.log("deleteNominalAccount: " + id)),
        tap((data) => {
          const foundIndex = this.nominalAccounts.findIndex(
            (item) => item.nominalAccountId === id
          );
          if (foundIndex > -1) {
            this.nominalAccounts.splice(foundIndex, 1);
            //this.changeSelectedNominalAccount(null);
          }
        }),
        catchError(this.handleError)
      );
  }

  private createNominalAccount(
    nominalAccount: NominalAccount,
    headers: HttpHeaders
  ): Observable<NominalAccount> {
    nominalAccount.nominalAccountId = null;
    return this.http
      .post<NominalAccount>(this.nominalAccountUrl, nominalAccount, { headers })
      .pipe(
        tap((data) =>
          console.log("createNominalAccount: " + JSON.stringify(data))
        ),
        tap((data) => {
          // If the user selected to add before listing the nominalAccounts,
          // The nominalAccounts won't yet be retrieved.
          if (this.nominalAccounts) {
            this.nominalAccounts.push(data);
          }
          //this.changeSelectedNominalAccount(data);
        }),
        catchError(this.handleError)
      );
  }

  private updateNominalAccount(
    nominalAccount: NominalAccount,
    headers: HttpHeaders
  ): Observable<NominalAccount> {
    const url = `${this.nominalAccountUrl}/${nominalAccount.nominalAccountId}`;
    return this.http
      .put<NominalAccount>(url, nominalAccount, { headers })
      .pipe(
        tap((data) =>
          console.log(
            "updateNominalAccount: " + nominalAccount.nominalAccountId
          )
        ),
        catchError(this.handleError)
      );
  }

  private initializeNominalAccount(): NominalAccount {
    // Return an initialized object
    return {
      nominalAccountId: 0,
      nominalAccountCode: "",
      nominalAccountDisabled: "",
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
