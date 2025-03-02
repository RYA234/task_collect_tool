export interface HabiticaTask {
    _id: string;
    up: boolean;
    down: boolean;
    counterUp: number;
    counterDown: number;
    frequency: string;
    history: any[];
    type: string;
    text: string;
    notes: string;
    tags: any[];
    value: number;
    priority: number;
    attribute: string;
    challenge: object;
    group: object;
    reminders: any[];
    byHabitica: boolean;
    createdAt: string;
    updatedAt: string;
    userId: string;
    id: string;
    everyX?: number;
    startDate?: string;
    repeat?: object;
    streak?: number;
    daysOfMonth?: any[];
    weeksOfMonth?: any[];
    nextDue?: any[];
    yesterDaily?: boolean;
    completed: boolean;
    collapseChecklist: boolean;
    checklist: any[];
    isDue?: boolean;
    date?: string;
}

export interface HabiticaNotification {
    id: string;
    type: string;
    data: object;
    seen: boolean;
}

export interface HabiticaResponse {
    data: HabiticaTask[];
    notifications: HabiticaNotification[];
    userV: number;
    appVersion: string;
}