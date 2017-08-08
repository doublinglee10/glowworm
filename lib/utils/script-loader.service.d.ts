import { Observable } from "rxjs/Observable";
export interface ScriptModel {
    src: string;
    loaded?: boolean;
}
export declare class ScriptLoaderService {
    private scripts;
    load(script: ScriptModel): Observable<ScriptModel>;
}
