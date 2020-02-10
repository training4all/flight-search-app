import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { IconService } from 'src/services/icon/icon.service';
import { FlightService } from 'src/services/flight/flight.service';
import { Constants } from 'src/constants';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [FlightService]
})
export class AppComponent {

    title = 'flight-search-app';

    public searchStarted: boolean;
    private icons = ['flight'];
    public languages = [
        {
            label: 'English',
            locale: 'en'
        },
        {
            label: 'German',
            locale: 'de'
        }
    ];

    constructor(
        private iconService: IconService,
        private translateService: TranslateService) {
        this.translateService.setDefaultLang(Constants.DefaultLocale);
        iconService.register(this.icons);
    }

    public onSearchClicked(state): void {
        this.searchStarted = state;
    }

    public onLanguageChange(locale: string) {
        this.translateService.setDefaultLang(locale);
    }
}
