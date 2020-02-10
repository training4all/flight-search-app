import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class IconService {

    constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    }

    private baseSvgPath = 'assets/icons/';

    private iconPathMapper = [{
        icon: 'flight_takeoff',
        svg: 'flight_takeoff-24px.svg'
    },
    {
        icon: 'flight',
        svg: 'flight-24px.svg'
    },
    {
        icon: 'flight_land',
        svg: 'flight_land-24px.svg'
    },
    {
        icon: 'search',
        svg: 'search-24px.svg'
    }];

    public register(icons: string[]) {
        for (const icon of icons) {
            const map = this.iconPathMapper.find(item => item.icon === icon);
            if (!_.isNil(map)) {
                this.iconRegistry.addSvgIcon(
                    map.icon,
                    this.sanitizer.bypassSecurityTrustResourceUrl(`${this.baseSvgPath}${map.svg}`));
            }
        }
    }
}
