import {Pipe, PipeTransform} from "@angular/core";


/**
 * 根据多个key过滤对象数组
 */
@Pipe({
    name: 'multiKeysFilter',
    pure: true
})
export class MultiKeysFilter implements PipeTransform {

    transform(data: any[], name: string, keys: string[]): any {
        if (!name || !keys) {
            return data;
        }

        return data.filter((item: any) => {
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i];
                let val = item[key];
                if (val && `${val}`.includes(name)) {
                    return true;
                }
            }
            return false;
        });
    }

}

