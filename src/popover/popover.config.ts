import {Injectable} from "@angular/core";

export type Config = {
    [key: string]: any
}

@Injectable()
export class PopoverConfig {

    private _config: Config = {
        placement: 'bottom-right'
    };

    set config(config: Config) {
        this._config = {...this._config, ...config};
    }

    get config() {
        return {...this._config};
    }

}