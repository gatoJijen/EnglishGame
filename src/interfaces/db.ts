export interface Categories {
    description: string;
    title: string;
    type: string;
    url: string;
}
export interface Decks {
    name: string | undefined;
    description: string | undefined;
    requeriments: string | undefined;
    img: string | undefined;
    index: number | null;
}
export interface Cards {
    name: string | undefined;
    type: string | undefined;
    value: number | null | undefined;
    img: string | undefined;
    index: number | null;
}
export interface propsAddDb {
    description?: string,
    title?: string,
    type: string,
    url?: string,
}




export interface UserData {
    displayName: string;
    photoURL: string;
    categoria: string;
};