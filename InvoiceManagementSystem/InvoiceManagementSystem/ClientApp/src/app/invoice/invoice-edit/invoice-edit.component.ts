import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.css']
})
export class InvoiceEditComponent implements OnInit {


  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const invoiceId = +this.route.snapshot.paramMap.get('id');
    console.log(invoiceId)
  }

}
