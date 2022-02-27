  import { Component, Input, OnInit } from '@angular/core';
  import { MatIconRegistry } from '@angular/material/icon';
  import { DomSanitizer } from '@angular/platform-browser';
  import { Router } from '@angular/router';
  @Component({
    selector: 'app-header-menu',
    templateUrl: './header-menu.component.html',
    styleUrls: ['./header-menu.component.scss']
  })
  export class HeaderMenuComponent implements OnInit {
  @Input() currentPage: string = 'address';
    constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer,private router: Router) {
      this.matIconRegistry.addSvgIcon(
        'wow-logo',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../../../assets/images/WOW!_logo.svg'
        )
      );
    }

    ngOnInit(): void {
    }
    goToPage(page: string){
      this.router.navigate(['./' + page]);
    }
  }
  
