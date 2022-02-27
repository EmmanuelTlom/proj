import { OverlayOutsideClickDispatcher } from '@angular/cdk/overlay';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-calendar-time-scheduler',
  templateUrl: './calendar-time-scheduler.component.html',
  styleUrls: ['./calendar-time-scheduler.component.scss'],
})
export class CalendarTimeSchedulerComponent implements OnInit {
  MinDate = new Date();
  date: Date = new Date();
  today: Date;
  selectTimeConfirmIndex: any;
  times: any[] = [];

  @Output() onConfirmDate = new EventEmitter<any>();

  @ViewChild(MatDatepicker) public theTimePicker: MatDatepicker<Date> | any;

  constructor(private cdkConnectedOverlay: OverlayOutsideClickDispatcher) {
    this.today = new Date();
  }

  ngOnInit(): void {
    this.searchTime();
  }

  onDateSelect(e: any) {
    console.log('date: ' + e.value);
    this.date = e.value;
    this.searchTime(e.value.getDate());
  }

  searchTime(dataTosend?: any) {
    // this.times = [
    //   {
    //     name: 'Not Time Avilable for ' + dataTosend.DateToCheck,
    //   },
    // ];

    this.times = [
      {
        MeetingTime: '12:00 PM',
      },
      {
        MeetingTime: '12:30 PM',
      },
      {
        MeetingTime: '1:00 PM',
      },
      {
        MeetingTime: '1:30 PM',
      },
      {
        MeetingTime: '2:00 PM',
      },
      {
        MeetingTime: '2:30 PM',
      },
      {
        MeetingTime: '3:00 PM',
      },
      {
        MeetingTime: '3:30 PM',
      },
      {
        MeetingTime: '4:00 PM',
      },
      {
        MeetingTime: '4:30 PM',
      },
      {
        MeetingTime: '5:00 PM',
      },
      {
        MeetingTime: '5:30 PM',
      },
      {
        MeetingTime: '6:00 PM',
      },
      {
        MeetingTime: '6:30 PM',
      },
      {
        MeetingTime: '7:00 PM',
      },
      {
        MeetingTime: '7:30 PM',
      },
      {
        MeetingTime: '8:00 PM',
      },
      {
        MeetingTime: '8:30 PM',
      },
    ];
  }

  _openCalendar(picker: MatDatepicker<Date>, direction: any) {
    // rewrite autoclose after date is chosen
    this.theTimePicker.close = () => {};
    let timeInterval = 0;
    if (direction === 'prev') {
      timeInterval = 500;
    }
    if (true) {
      setTimeout(() => {
        picker.open();
      }, timeInterval);
    } else {
      picker.close();
    }

    // close calendar manually on outside click
    this.cdkConnectedOverlay._attachedOverlays[0]._outsidePointerEvents.subscribe(
      () => {
        // restore saved close method
        // this.theTimePicker.close = this.selfClose;
        // this.selfClose = undefined;
        this.theTimePicker.close();
      }
    );
  }

  confirmDate(time: any) {
    this.onConfirmDate.emit(time);
    // this.form.value.time = time;
    // this.time = this.form.value.time;
    // if (this.form.value.time) {
    //   this.desableNextButton = false;
    // }
    // this.nextStep();
    // console.log(time);
    // this.setCurrentStep(4);
  }
}
