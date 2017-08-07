import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'gwSelectFilter',
    pure: false
})
export class GWSelectFilter implements PipeTransform {
    transform(data: any[], name: string): any {
        return !name ? data : data.filter(item => item.label.includes(name));
    }
}