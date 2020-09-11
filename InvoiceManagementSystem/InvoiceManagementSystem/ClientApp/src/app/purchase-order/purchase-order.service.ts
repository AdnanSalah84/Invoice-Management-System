import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";

import { Observable, of, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { PurchaseOrder } from "./purchase-order";

@Injectable({
  providedIn: "root",
})
export class PurchaseOrderService {
  private purchaseOrderUrl = "api/purchaseorder";
  private purchaseOrders: PurchaseOrder[];

  constructor(private http: HttpClient) {}

  getPurchaseOrders(): Observable<PurchaseOrder[]> {
    if (this.purchaseOrders) {
      return of(this.purchaseOrders);
    }
    return this.http.get<PurchaseOrder[]>(this.purchaseOrderUrl).pipe(
      tap((data) => console.log("All PurchaseOrders", JSON.stringify(data))),
      tap((data) => (this.purchaseOrders = data)),
      catchError(this.handleError)
    );
  }

  getPurchaseOrder(id: number): Observable<PurchaseOrder> {
    if (id === 0) {
      return of(this.initializePurchaseOrder());
    }
    if (this.purchaseOrders) {
      const foundItem = this.purchaseOrders.find(
        (item) => item.purchaseOrderId === id
      );
      if (foundItem) {
        return of(foundItem);
      }
    }
    const url = `${this.purchaseOrderUrl}/${id}`;
    return this.http.get<PurchaseOrder>(url).pipe(
      tap((data) =>
        console.log("Single PurchaseOrder: " + JSON.stringify(data))
      ),
      catchError(this.handleError)
    );
  }

  savePurchaseOrder(purchaseOrder: PurchaseOrder): Observable<PurchaseOrder> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    if (purchaseOrder.purchaseOrderId === 0) {
      return this.createPurchaseOrder(purchaseOrder, headers);
    }
    return this.updatePurchaseOrder(purchaseOrder, headers);
  }

  deletePurchaseOrder(id: number): Observable<PurchaseOrder> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const url = `${this.purchaseOrderUrl}/${id}`;
    return this.http
      .delete<PurchaseOrder>(url, { headers })
      .pipe(
        tap((data) => console.log("deletePurchaseOrder: " + id)),
        tap((data) => {
          const foundIndex = this.purchaseOrders.findIndex(
            (item) => item.purchaseOrderId === id
          );
          if (foundIndex > -1) {
            this.purchaseOrders.splice(foundIndex, 1);
            //this.changeSelectedPurchaseOrder(null);
          }
        }),
        catchError(this.handleError)
      );
  }

  private createPurchaseOrder(
    purchaseOrder: PurchaseOrder,
    headers: HttpHeaders
  ): Observable<PurchaseOrder> {
    purchaseOrder.purchaseOrderId = null;
    return this.http
      .post<PurchaseOrder>(this.purchaseOrderUrl, purchaseOrder, { headers })
      .pipe(
        tap((data) =>
          console.log("createPurchaseOrder: " + JSON.stringify(data))
        ),
        tap((data) => {
          // If the user selected to add before listing the purchaseOrders,
          // The purchaseOrders won't yet be retrieved.
          if (this.purchaseOrders) {
            this.purchaseOrders.push(data);
          }
          //this.changeSelectedPurchaseOrder(data);
        }),
        catchError(this.handleError)
      );
  }

  private updatePurchaseOrder(
    purchaseOrder: PurchaseOrder,
    headers: HttpHeaders
  ): Observable<PurchaseOrder> {
    const url = `${this.purchaseOrderUrl}/${purchaseOrder}`;
    return this.http
      .put<PurchaseOrder>(url, purchaseOrder, { headers })
      .pipe(
        tap((data) =>
          console.log("updatePurchaseOrder: " + purchaseOrder.purchaseOrderId)
        ),
        catchError(this.handleError)
      );
  }

  private initializePurchaseOrder(): PurchaseOrder {
    // Return an initialized object
    return {
      purchaseOrderId: 0,
      purchaseOrderNumber: "",
      purchaseOrderAmountNet: 0,
      purchaseOrderAmountTax: 0,
      purchaseOrderAmountGross: 0,
      purchaseOrderDisabled: "",
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
