import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { IOrder } from "./order";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  private orderUrl = "api/order";
  private orders: IOrder[];

  constructor(private http: HttpClient) {}

  getOrders(): Observable<IOrder[]> {
    if (this.orders) {
      return of(this.orders);
    }
    return this.http.get<IOrder[]>(this.orderUrl).pipe(
      tap((data) => console.log("All Orders", JSON.stringify(data))),
      tap((data) => (this.orders = data)),
      catchError(this.handleError)
    );
  }

  getOrder(id: number): Observable<IOrder> {
    if (id === 0) {
      return of(this.initializeOrder());
    }
    if (this.orders) {
      const foundItem = this.orders.find((item) => item.orderId === id);
      if (foundItem) {
        return of(foundItem);
      }
    }
    const url = `${this.orderUrl}/${id}`;
    return this.http.get<IOrder>(url).pipe(
      tap((data) => console.log("Single Order: " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  saveOrder(order: IOrder): Observable<IOrder> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    if (order.orderId === 0) {
      return this.createOrder(order, headers);
    }
    return this.updateOrder(order, headers);
  }

  deleteOrder(id: number): Observable<IOrder> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const url = `${this.orderUrl}/${id}`;
    return this.http
      .delete<IOrder>(url, { headers })
      .pipe(
        tap((data) => console.log("deleteOrder: " + id)),
        tap((data) => {
          const foundIndex = this.orders.findIndex(
            (item) => item.orderId === id
          );
          if (foundIndex > -1) {
            this.orders.splice(foundIndex, 1);
            //this.changeSelectedProduct(null);
          }
        }),
        catchError(this.handleError)
      );
  }

  private createOrder(order: IOrder, headers: HttpHeaders): Observable<IOrder> {
    order.orderId = null;
    return this.http
      .post<IOrder>(this.orderUrl, order, { headers })
      .pipe(
        tap((data) => console.log("createOrder: " + JSON.stringify(data))),
        tap((data) => {
          // If the user selected to add before listing the orders,
          // The orders won't yet be retrieved.
          if (this.orders) {
            this.orders.push(data);
          }
          //this.changeSelectedProduct(data);
        }),
        catchError(this.handleError)
      );
  }

  private updateOrder(order: IOrder, headers: HttpHeaders): Observable<IOrder> {
    const url = `${this.orderUrl}/${order.orderId}`;
    return this.http
      .put<IOrder>(url, order, { headers })
      .pipe(
        tap((data) => console.log("updateOrder: " + order.orderId)),
        catchError(this.handleError)
      );
  }

  private initializeOrder(): IOrder {
    // Return an initialized object
    return {
      orderId: 0,
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
