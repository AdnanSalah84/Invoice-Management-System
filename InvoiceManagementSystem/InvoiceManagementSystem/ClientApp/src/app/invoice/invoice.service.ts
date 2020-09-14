import { Injectable } from "@angular/core";

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";

import { Observable, of, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Invoice } from "./invoice";

@Injectable({
  providedIn: "root",
})
export class InvoiceService {
  private invoiceUrl = "api/invoice";
  private invoices: Invoice[];

  constructor(private http: HttpClient) {}

  getInvoices(): Observable<Invoice[]> {
    //if (this.invoices) {
    //  return of(this.invoices);
    //}
    return this.http.get<Invoice[]>(this.invoiceUrl).pipe(
      tap((data) => console.log("All Invoices", JSON.stringify(data))),
      tap((data) => (this.invoices = data)),
      catchError(this.handleError)
    );
  }

  getInvoice(id: number): Observable<Invoice> {
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
    return this.http.get<Invoice>(url).pipe(
      tap((data) => console.log("Single Invoice: " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  saveInvoice(invoice: Invoice): Observable<Invoice> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    if (invoice.invoiceId === 0 || invoice.invoiceId === undefined) {
      return this.createInvoice(invoice, headers);
    }
    return this.updateInvoice(invoice, headers);
  }

  deleteInvoice(id: number): Observable<Invoice> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const url = `${this.invoiceUrl}/${id}`;
    return this.http
      .delete<Invoice>(url, { headers })
      .pipe(
        tap((data) => console.log("deleteInvoice: " + id)),
        tap((data) => {
          const foundIndex = this.invoices.findIndex(
            (item) => item.invoiceId === id
          );
          if (foundIndex > -1) {
            this.invoices.splice(foundIndex, 1);
            //this.changeSelectedInvoice(null);
          }
        }),
        catchError(this.handleError)
      );
  }

  private createInvoice(
    invoice: Invoice,
    headers: HttpHeaders
  ): Observable<Invoice> {
    //invoice.invoiceId = null;
    return this.http
      .post<Invoice>(this.invoiceUrl, invoice, { headers })
      .pipe(
        tap((data) => console.log("createInvoice: " + JSON.stringify(data))),
        tap((data) => {
          // If the user selected to add before listing the invoices,
          // The invoices won't yet be retrieved.
          if (this.invoices) {
            this.invoices.push(data);
          }
          //this.changeSelectedInvoice(data);
        }),
        catchError(this.handleError)
      );
  }

  private updateInvoice(
    invoice: Invoice,
    headers: HttpHeaders
  ): Observable<Invoice> {
    const url = `${this.invoiceUrl}/${invoice.invoiceId}`;
    return this.http
      .put<Invoice>(url, invoice, { headers })
      .pipe(
        tap((data) => console.log("updateInvoice: " + invoice.invoiceId)),
        catchError(this.handleError)
      );
  }

  private initializeInvoice(): Invoice {
    // Return an initialized object
    return {
      invoiceId: 0,
      invoiceReference: "",
      issueDate: null,
      dueDate: null,
      amountNet: 0,
      amountTax: 0,
      amountGross: 0,
      status: "",
      description: "",
      filePath: "",
      fileBody: "",
      modifiedBy: "",
      modifiedDate: null,
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
