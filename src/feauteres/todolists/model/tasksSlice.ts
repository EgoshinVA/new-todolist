export type TaskType = {
    id: string;
    title: string;
    completed: boolean;
}

export type TasksType = {
    [id: string]: TaskType[];
}