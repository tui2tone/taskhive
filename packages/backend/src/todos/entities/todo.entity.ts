export interface Todo {
    uuid: string;
    text: string;
    isCompleted?: boolean | null;
    priorityId?: number | null;
}