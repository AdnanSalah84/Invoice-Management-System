import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";

import { Observable, of, throwError } from "rxjs";

import { catchError, tap } from "rxjs/operators";

import { Supplier } from "./supplier";


@Injectable({
  providedIn: "root",
})
export class SupplierService {
  private supplierUrl = "api/supplier";
  private suppliers: Supplier[];

  constructor(private http: HttpClient) {}

  getSuppliers(): Observable<Supplier[]> {
    if (this.suppliers) {
      return of(this.suppliers);
    }
    return this.http.get<Supplier[]>(this.supplierUrl).pipe(
      tap((data) => console.log("All Suppliers", JSON.stringify(data))),
      tap((data) => (this.suppliers = data)),
      catchError(this.handleError)
    );
  }

  getSupplier(id: number): Observable<Supplier> {
    if (id === 0) {
      return of(this.initializeSupplier());
    }
    if (this.suppliers) {
      const foundItem = this.suppliers.find((item) => item.supplierId === id);
      if (foundItem) {
        return of(foundItem);
      }
    }
    const url = `${this.supplierUrl}/${id}`;
    return this.http.get<Supplier>(url).pipe(
      tap((data) => console.log("Single Supplier: " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  saveSupplier(supplier: Supplier): Observable<Supplier> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    if (supplier.supplierId === 0) {
      return this.createSupplier(supplier, headers);
    }
    return this.updateSupplier(supplier, headers);
  }

  deleteSupplier(id: number): Observable<Supplier> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const url = `${this.supplierUrl}/${id}`;
    return this.http
      .delete<Supplier>(url, { headers })
      .pipe(
        tap((data) => console.log("deleteSupplier: " + id)),
        tap((data) => {
          const foundIndex = this.suppliers.findIndex(
            (item) => item.supplierId === id
          );
          if (foundIndex > -1) {
            this.suppliers.splice(foundIndex, 1);
            //this.changeSelectedSupplier(null);
          }
        }),
        catchError(this.handleError)
      );
  }

  private createSupplier(
    supplier: Supplier,
    headers: HttpHeaders
  ): Observable<Supplier> {
    supplier.supplierId = null;
    return this.http
      .post<Supplier>(this.supplierUrl, supplier, { headers })
      .pipe(
        tap((data) => console.log("createSupplier: " + JSON.stringify(data))),
        tap((data) => {
          // If the user selected to add before listing the suppliers,
          // The suppliers won't yet be retrieved.
          if (this.suppliers) {
            this.suppliers.push(data);
          }
          //this.changeSelectedSupplier(data);
        }),
        catchError(this.handleError)
      );
  }

  private updateSupplier(
    supplier: Supplier,
    headers: HttpHeaders
  ): Observable<Supplier> {
    const url = `${this.supplierUrl}/${supplier.supplierId}`;
    return this.http
      .put<Supplier>(url, supplier, { headers })
      .pipe(
        tap((data) => console.log("updateSupplier: " + supplier.supplierId)),
        catchError(this.handleError)
      );
  }

  private initializeSupplier(): Supplier {
    // Return an initialized object
    return {
      supplierId: 0,
      supplierName: "",
      supplierCode: "",
      supplierDisabled: "",
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
