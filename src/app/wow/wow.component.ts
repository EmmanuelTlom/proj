import { DatePipe, DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDatepicker } from '@angular/material/datepicker'
import { FormService } from './form.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DeviceDetectorService } from 'ngx-device-detector';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { OverlayOutsideClickDispatcher } from '@angular/cdk/overlay';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-wow',
  templateUrl: './wow.component.html',
  styleUrls: ['./wow.component.scss'],
  providers: [FormService]
})
export class WowComponent implements OnInit, AfterViewInit {


  form: any;
  today: Date;
  options: any;
  callType = ['New Project Discussion', 'INN/USAN', 'Introduction'];
  selected: string | any;
  call = 'call';
  time = '08:00';
  scheduleForm: any;
  isValidForm: boolean | any;
  items: Observable<any[]> | any;
  formErrors: any;
  paramsArray: any;
  email = '';
  directorId = '';
  indexTabCounter = 0;
  desableNextButton = true;

  selectedIndex: number = 0;

  isNextTab = true;
  desablePrevioustButton = false;
  disablePersonalInfoTab = true;
  isForm = true;
  isThankyou = false;


  date: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: true,
    closeOnSelect: false
  }

  times: any[] = [];
  validForm = false;
  emptyFormFields: any = [];
  formAlert = false;
  selectTimeConfirm = false;
  selectTimeConfirmIndex: any;
  MinDate = new Date();

  timeZone: any;

  timeZoneOption = [{ value: 'EDT', name: 'Eastern Daylight Time (EDT)' }, { value: 'EST', name: 'Eastern Time (EST)' }, { value: 'CST', name: 'Central Time (CST)' }, { value: 'MT', name: 'Mountain Time (MT)' },
  { value: 'PST', name: 'Pacific Time (PST)' }, { value: 'WET', name: 'Western European Time (WET)' }, { value: 'CET', name: 'Central European Time (CET)' }, { value: 'EET', name: 'Eastern European Time (EET)' },
  { value: 'JPT', name: 'Japan Time (JPT)' }, { value: 'KST', name: 'Korea Time (KST)' }, { value: 'BRT', name: 'Brasilia Time (BRT)' }]

  @ViewChild(MatDatepicker) public theTimePicker: MatDatepicker<Date> | any;


  //device detection
  isMobile: boolean = false;
  isTablet: boolean = false;
  isDesktopDevice: boolean = false;
  isLandingPage: boolean = false;
  deviceInfo: any;
  isLinear = true;
  stepIconIndex = 5;
  isStepDone1 = false
  isStepDone2 = false
  isStepDone3 = false
  isStepDone4 = false
  isStepDone5 = false
  isStepDone6 = false

  STEPER_ICONS = [{ step: '1', stepTitle:'Facility and Services', class: 'active' },{ step: '2', stepTitle:'Order Information', class: 'no-active' },
  { step: '3', stepTitle:'Company Information', class: 'no-active' },{ step: '4', stepTitle:'Appointment Details', class: 'no-active' },
  { step: '5', stepTitle:'Contact information', class: 'no-active' },{ step: '6', stepTitle:'Appointment Summary', class: 'no-active' },
  ];
  STEPER_ICONS_DONE = []
  serviceType: any
  step1Move = true
  // FORM VARIABLES
  SERVICES = [{ name: 'service 1' }, { name: 'service 2' }, { name: 'service 3' },
  { name: 'service 4' }, { name: 'service 5' }, { name: 'service 6' }, { name: 'service 7' }, { name: 'service 8' }, { name: 'service 9' }]
  EQUIPMENT = [{ name: 'Equipment 1' }, { name: 'Equipment 2' }, { name: 'Equipment 3' },
  { name: 'Equipment 4' }, { name: 'Equipment 5' }, { name: 'Equipment 6' }, { name: 'Equipment 7' }, { name: 'Equipment 8' }, { name: 'Equipment 9' }]
  firstFormGroup: FormGroup | any;
  secondFormGroup: FormGroup | any;
  @ViewChild('videoLand') videoLand: ElementRef | any;

  dataTosend: { token: string; payload: string; } = {
    token: '6C08E006-1E00-46DC-A844-76888612BB0E'
    , payload: ''
  };

  constructor(private deviceService: DeviceDetectorService, private _formBuilder: FormBuilder, private matIconRegistry: MatIconRegistry,
    public _FormService: FormService, private domSanitizer: DomSanitizer,
    private paramsRouter: ActivatedRoute,@Inject(DOCUMENT) private document: any,
    private changeDetectorRef: ChangeDetectorRef,
    private cdkConnectedOverlay: OverlayOutsideClickDispatcher)  {
    this.matIconRegistry.addSvgIcon(
      'unicorn',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/images/go freight hub circle.svg'
      )
    );
    this.today = new Date();
    this.formErrors = {
      company: {},
      firstName: {},
      lastName: {},
      email: {},
      phone: {},
      date: {},
      time: {},
      timeZone: {},
      type: {},
      note: {},
      address: {},
      city: {},
      // state: {},
      contry: {},
      // postalcode: {},
    };
    // this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    if (window.innerHeight< 800) {
      this.document.body.style.zoom = 0.8;
    }
}

  ngOnInit(): void {


    this.form = this._formBuilder.group({
      company: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      phone: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      // timeZone: ['', Validators.required],
      type: ['', Validators.required],
      // type2: ['', Validators.required],
      note: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: [''],
      country: ['', Validators.required],
      postalcode: ['']
    });

    let d = new Date();
    this.dataTosend = {
      token: '6C08E006-1E00-46DC-A844-76888612BB0E'
      , payload: JSON.stringify({
        DirectorId: '123',
        UserTimeZone: 'GMT' + d.toString().split('GMT')[1],
        DateToCheck: d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear()

      })
    }

    this.searchTime(2)

    this.timeZoneOption.push({ value: 'GMT' + new Date().toString().split('GMT')[1], name: 'GMT' + new Date().toString().split('GMT')[1] });
    this.selected = 'GMT' + new Date().toString().split('GMT')[1];




    // DETECT BROWSER
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();


  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.videoLand) {
        this.videoLand.nativeElement.play()
        const media = this.videoLand.nativeElement;
        media.muted = true; // without this line it's not working although I have "muted" in HTML
        media.play();
      }

    }, 0);

  }
  // STEPPER METHODS
  setCurrentStep(index: number) {
    if (this.step1Move) {
      this.stepIconIndex = index;
      this.STEPER_ICONS.forEach((item, i) => {
        this.STEPER_ICONS[index].class = 'active';
        if (i < index) {
          this.STEPER_ICONS[i].class = 'done';
        } else if (i > index) {
          this.STEPER_ICONS[i].class = 'no-active';
        }
      });
    }
  }
  serviceSelected(serviceType: string) {
    if (serviceType) {
      this.step1Move = true
    }
  }


// 🎰🎰🎰🎰🎰🎰🎰🎰🎰🎰🎰🎰🎰🎰🎰🎰🎰🎰🎰🎰🎰🎰🎰🎰🎰🎰🎰🎰🎰🎰🎰🎰🎰🎰🎰🎰🎰🎰🎰🎰🎰🎰

  // OLD FORM CODE

  _openCalendar(picker: MatDatepicker<Date>, direction: any) {
    let timeInterval = 0;
    if (direction === 'prev') {
      timeInterval = 500;
    }
    if (this.isNextTab) {
      setTimeout(() => {
        picker.open();
      }, timeInterval);
    } else {
      picker.close();
    }




    // rewrite autoclose after date is chosen
    this.theTimePicker.close = () => {};

    // close calendar manually on outside click
    this.cdkConnectedOverlay._attachedOverlays[0]._outsidePointerEvents.subscribe(() => {
      // restore saved close method
      // this.theTimePicker.close = this.selfClose;
      // this.selfClose = undefined;
      this.theTimePicker.close();
    });

  }

  _closeCalendar(picker: MatDatepicker<Date>) {
    picker.close();
  }


  searchTime(dataTosend?: any) {

    this.times = [{
      "name": 'Not Time Avilable for ' + dataTosend.DateToCheck
    }]


    if (dataTosend.payload) {
      let timeData: any[] = [];

      this._FormService.getTimeZoneData(dataTosend).subscribe((res: any) => {


        this.times = JSON.parse(res.d);


        this.times.forEach(res => {

          if (res.isOpen === 'true') {

            res.MeetingTime = res.MeetingTime.split('T')[1];

            timeData.push(res);
          }
        })

        this.times = timeData;



      })
    }
    else {

      this.times = [
        {
          "MeetingTime": "12:00 PM"
        },
        {
          "MeetingTime": "12:30 PM"
        },
        {
          "MeetingTime": "1:00 PM"
        },
        {
          "MeetingTime": "1:30 PM"
        },
        {
          "MeetingTime": "2:00 PM"
        },
        {
          "MeetingTime": "2:30 PM"
        },
        {
          "MeetingTime": "3:00 PM"
        },
        {
          "MeetingTime": "3:30 PM"
        },
        {
          "MeetingTime": "4:00 PM"
        },
        {
          "MeetingTime": "4:30 PM"
        },
        {
          "MeetingTime": "5:00 PM"
        },
        {
          "MeetingTime": "5:30 PM"
        },
        {
          "MeetingTime": "6:00 PM"
        },
        {
          "MeetingTime": "6:30 PM"
        },
        {
          "MeetingTime": "7:00 PM"
        },
        {
          "MeetingTime": "7:30 PM"
        },
        {
          "MeetingTime": "8:00 PM"
        },
        {
          "MeetingTime": "8:30 PM"
        }
      ];
    }


  }

  onSubmit(): void {
    this.form.value.date = this.date.toString();
    // this._FormService.markFormGroupTouched(this.form);


    // this.form.value.forEach(field => {
    //   if ${this.form.value[property]} !== "") {
    //     this.validForm = true;
    //   }else{
    //     this.validForm = false;
    //   }
    // });
    this.emptyFormFields = [];
    this.validForm = false;
    for (const property in this.form.value) {

      console.log(`${property}: ${this.form.value[property]}`);
      if (`${this.form.value[property]}` !== "") {
        this.validForm = true;
      } else {
        this.validForm = false;
        this.emptyFormFields.push(property)
        this.formAlert = true;
      }
    }

    if (this.validForm) {
      this._FormService.addEmailAppointment(this.form.value, this.email, this.directorId).subscribe(result => {
        // this.form.reset();
        // this._route.navigateByUrl('thankyou');
        this.isForm = false;
        this.isThankyou = true;
      });
    } else {
      this.formErrors = this._FormService.validateForm(this.form, this.formErrors, false);
    }
  }

  onDateSelect(e: any) {
    console.log("date: " + e.value);
    this.date = e.value;
    this.searchTime(e.value.getDate());
  }

  dismissErrorForm() {
    this.formAlert = false;
  }

  previousStep() {
    if (this.indexTabCounter > 0) {
      this.indexTabCounter = this.indexTabCounter - 1;
      this.selectedIndex = 0;
      this.isNextTab = true;
    }
    console.log(this.indexTabCounter);
  }

  nextStep() {
    if (this.indexTabCounter < 2) {
      this.indexTabCounter = 1 + this.indexTabCounter;
      this.selectedIndex = 1;
      this.disablePersonalInfoTab = false;
      this.isNextTab = false;
      this._closeCalendar(this.theTimePicker);
    }
    console.log(this.indexTabCounter);
  }


  radioChange(time: any) {
    this.form.value.time = time
    this.time = this.form.value.time;
    if (this.form.value.time) {
      this.desableNextButton = false;
    }
    this.nextStep();
    console.log(time);
    this.setCurrentStep(4)
  }


  makeAnother() {
    window.location.reload();
  }

}

