export interface GWSelect {
    id?: any;
    text?: any;
}

export interface SelectModal {
    value: string;
    selectValue: string;
}

export interface InputModal {
    value: string;
    selectValue: string;
}

export interface RangeInputModal{
  start:string;
  end:string;
  selectValue?: string;
}

export interface MultiSelectModal {
    value: GWSelect[] | any[];
    selectValue: string;
}
