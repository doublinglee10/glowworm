import { GWToolbarComponent } from "../toolbar/toolbar.component";
export declare type BtnSize = 'btn-lg' | 'btn-sm' | 'btn-xs' | 'btn-flat' | 'disabled' | 'default';
export declare abstract class GWControl {
    btnSize: BtnSize;
    closeable: boolean;
    enabled: boolean;
    label: string;
    showSelect: boolean;
    selectData: any[];
    linkAge: boolean;
    onRemove: Function;
    toolbar: GWToolbarComponent;
}
