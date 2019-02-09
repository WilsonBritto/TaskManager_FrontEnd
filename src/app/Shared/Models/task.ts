export class Task {
    taskId: number;
    parentId: number;
    taskDetails: string;
    startDate: Date;
    endDate: Date;
    priority: number;
    isTaskEnded: boolean;
}
