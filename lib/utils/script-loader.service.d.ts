import { Observable } from "rxjs/Observable";
export interface ScriptModel {
    src: string;
    loaded?: boolean;
}
export declare class ScriptLoaderService {
    scripts: ScriptModel[];
    load(script: ScriptModel): Observable<ScriptModel>;
}
