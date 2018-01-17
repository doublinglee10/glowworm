import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'gwlinkAgeFilter',
    pure: false
})
export class LinkAgeFilter implements PipeTransform {
    transform(data: any[], name: string): any {
        return !name ? data : data.filter(item =>
          item.id.startsWith(name+'-')
        );
    }
}

