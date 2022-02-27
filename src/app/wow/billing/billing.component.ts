import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goToNextPage(){
    this.router.navigate(['./products']);
  }
}
