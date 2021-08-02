export interface data {
    student: string,
    task: string,
}


export interface Todo {
    id: string;
    task: string;
    student: string;
    isCompleted: boolean;
    version: number;
}