import {Injectable} from "@angular/core";

export type Config = {
    [key: string]: any
}

/**
 * @deprecated
 * use gw-connected-overlay or cdk-connected-overlay instead
 */
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