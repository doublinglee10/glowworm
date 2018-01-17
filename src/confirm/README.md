## Demo1
```
import {Component} from "@angular/core";

@Component({
    selector: 'gwconfirm-demo',
    template: `
        <p>
            <button gw-confirm
                    [title]="'hello world'"
                    [content]="'this is a string content'"
                    (onConfirm)="ok()"
                    (onCancel)="cancel()">
                confirm with string content
            </button>
        </p>

        <p>
            <ng-template #tpl>
                <h1>this is a template content</h1>
            </ng-template>
            <button gw-confirm
                    [title]="'hello world'"
                    [content]="tpl"
                    (onConfirm)="ok()"
                    (onCancel)="cancel()">
                confirm with template content
            </button>
        </p>


        <p>
            <button gw-confirm
                    [title]="'hello world'"
                    [content]="component"
                    (onConfirm)="ok()"
                    (onCancel)="cancel()">
                confirm with component content
            </button>
        </p>
    `
})
export class GwconfirmDemoComponent {

    component = GwconfirmDemoXComponent;

    ok() {
        alert('ok')
    }

    cancel() {
        alert('cancel')
    }
}
```


## API

~~~
<button gw-confirm
        [title]=""
        [content]=""
        [confirmClass]=""
        [confirmText]=""
        [zIndex]=""
        (onConfirm)=""
        [cancelText]=""
        (onCancel)="">
</button>
~~~


## GwConfirmService

```
show(config: GwConfirmConfig)
```


## GwConfirmConfig
```
export interface GwConfirmConfig {
    title?: string;
    content?: string;
    confirmClass?: string;
    confirmText?: string;
    zIndex?: number;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}
```