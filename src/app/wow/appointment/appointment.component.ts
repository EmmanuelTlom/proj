import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onConfirmDate(time: any) {
    // this.form.value.time = time
    // this.time = this.form.value.time;
    // if (this.form.value.time) {
    //   this.desableNextButton = false;
    // }
    // this.nextStep();
    // console.log(time);
    // this.setCurrentStep(4)
  }
  goToNextPage(){
    this.router.navigate(['./products']);
  }
}
