import {EventManager} from "@angular/platform-browser";
import {Injectable, NgZone} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {debounceTime} from "rxjs/operators";

@Injectable()
export class WindowResizeService {

    get onResize$(): Observable<Window> {
        return this.resizeSubject.asObservable().pipe(debounceTime(10));
    }

    private resizeSubject: Subject<Window>;

    constructor(private eventManager: EventManager,
                private ngZone: NgZone) {
        this.resizeSubject = new Subject();
        this.ngZone.runOutsideAngular(() => {
            this.eventManager.addGlobalEventListener('window', 'resize', this.onResize.bind(this));
        });
    }

    private onResize(event: UIEvent) {
        this.resizeSubject.next(<Window>event.target);
    }
}