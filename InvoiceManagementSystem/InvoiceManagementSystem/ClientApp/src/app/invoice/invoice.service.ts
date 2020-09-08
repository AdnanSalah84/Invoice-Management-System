import { Injectable } from "@angular/core";

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { IInvoice } from "./invoice";

@Injectable({
  providedIn: "root",
})
export class InvoiceService {
  private invoiceUrl = "api/Invoice";
  private invoices: IInvoice[];

  constructor(private http: HttpClient) {}

  getInvoices(): Observable<IInvoice[]> {
    if (this.invoices) {
      return of(this.invoices);
    }
    return this.http.get<IInvoice[]>(this.invoiceUrl).pipe(
      tap((data) => console.log("All Invoices", JSON.stringify(data))),
      tap((data) => (this.invoices = data)),
      catchError(this.handleError)
    );
  }

  getInvoice(id: number): Observable<IInvoice> {
    if (id === 0) {
      return of(this.initializeInvoice());
    }
    if (this.invoices) {
      const foundItem = this.invoices.find((item) => item.invoiceId === id);
      if (foundItem) {
        return of(foundItem);
      }
    }
    const url = `${this.invoiceUrl}/${id}`;
    return this.http.get<IInvoice>(url).pipe(
      tap((data) => console.log("Single Invoice: " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  saveInvoice(invoice: IInvoice): Observable<IInvoice> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    if (invoice.invoiceId === 0) {
      return this.createInvoice(invoice, headers);
    }
    return this.updateInvoice(invoice, headers);
  }

  deleteInvoice(id: number): Observable<IInvoice> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const url = `${this.invoiceUrl}/${id}`;
    return this.http
      .delete<IInvoice>(url, { headers })
      .pipe(
        tap((data) => console.log("deleteInvoice: " + id)),
        tap((data) => {
          const foundIndex = this.invoices.findIndex(
            (item) => item.invoiceId === id
          );
          if (foundIndex > -1) {
            this.invoices.splice(foundIndex, 1);
            //this.changeSelectedProduct(null);
          }
        }),
        catchError(this.handleError)
      );
  }

  private createInvoice(
    invoice: IInvoice,
    headers: HttpHeaders
  ): Observable<IInvoice> {
    invoice.invoiceId = null;
    return this.http
      .post<IInvoice>(this.invoiceUrl, invoice, { headers })
      .pipe(
        tap((data) => console.log("createInvoice: " + JSON.stringify(data))),
        tap((data) => {
          // If the user selected to add before listing the invoices,
          // The invoices won't yet be retrieved.
          if (this.invoices) {
            this.invoices.push(data);
          }
          //this.changeSelectedProduct(data);
        }),
        catchError(this.handleError)
      );
  }

  private updateInvoice(
    invoice: IInvoice,
    headers: HttpHeaders
  ): Observable<IInvoice> {
    const url = `${this.invoiceUrl}/${invoice.invoiceId}`;
    return this.http
      .put<IInvoice>(url, invoice, { headers })
      .pipe(
        tap((data) => console.log("updateInvoice: " + invoice.invoiceId)),
        catchError(this.handleError)
      );
  }

  private initializeInvoice(): IInvoice {
    // Return an initialized object
    return {
      invoiceId: 0,
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
