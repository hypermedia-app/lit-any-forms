export interface IContract {
    title: string;
    description: string;
    fields: IFieldContract[];
}

export interface IFieldContract {
    property: string;
    range: string;
    required: boolean;
    title: string;
    description: string;
}
