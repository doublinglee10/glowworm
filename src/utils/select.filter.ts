import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'gwSelectFilter',
    pure: false
})
export class GWSelectFilter implements PipeTransform {
    transform(data: any[], name: string): any {
        if (data && name) {
            return data.filter(item => item.text.includes(name));
        } else {
            return data;
        }
    }
}

