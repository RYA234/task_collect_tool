import client from './db';
import { fetchData } from './hello';
import { HabiticaTask } from './response';
//  ts-node /src/batch/Haibitica/insertTask.ts
interface Task {
    id: string;
    acquisition_date: string;
    completed: boolean;
    collapse_checklist: boolean;
    checklist: string;
    type: string;
    text: string;
    notes: string;
    tags: string;
    value: number;
    priority: number;
    attribute: string;                                                                                                                                                                                                                                                     
    challenge: string;
    group:string;
    reminders: string;
    by_habitica: boolean;
    created_at: string;
    updated_at: string;
    user_id: string;
}

async function insertTask(task: Task) {
    const query = `
        INSERT INTO t_tasks (
            id, acquisition_date, completed, collapse_checklist, checklist, type, text, notes, tags, value, priority, attribute, challenge, "group", reminders, by_habitica, created_at, updated_at, user_id
        ) VALUES (

            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19
        )
    `;
    const values = [
        task.id, task.acquisition_date, task.completed, task.collapse_checklist, task.checklist, task.type, task.text, task.notes, task.tags, task.value, task.priority, task.attribute, task.challenge, task.group, task.reminders, task.by_habitica, task.created_at, task.updated_at, task.user_id
    ];

    try {
        await client.query(query, values);
        console.log('Task inserted successfully');
    } catch (err: any) {
        console.error('Error inserting task', err.stack);
    }
}

async function insertTasks(tasks: Task[]) {
    for (const task of tasks) {
        await insertTask(task);
    }
}

// Example usage
async function main() {
    const habiticaTasks: HabiticaTask[] = await fetchData();
    const tasks: Task[] = habiticaTasks.map(convertHabiticaTaskToTask);
    await insertTasks(tasks);
    process.exit(0); // プロセスを終了
}


function convertHabiticaTaskToTask(habiticaTask: HabiticaTask): Task {
    return {
        id: habiticaTask.id,
        acquisition_date: new Date().toISOString().split('T')[0],
        completed: habiticaTask.completed,
        collapse_checklist: habiticaTask.collapseChecklist,
        checklist: JSON.stringify(habiticaTask.checklist),
        type: habiticaTask.type,
        text: habiticaTask.text,
        notes: habiticaTask.notes,
        tags: JSON.stringify(habiticaTask.tags),
        value: habiticaTask.value,
        priority: habiticaTask.priority,
        attribute: habiticaTask.attribute,
        challenge: JSON.stringify(habiticaTask.challenge),
        group: JSON.stringify(habiticaTask.group),
        reminders: JSON.stringify(habiticaTask.reminders),
        by_habitica: habiticaTask.byHabitica,
        created_at: habiticaTask.createdAt,
        updated_at: habiticaTask.updatedAt,
        user_id: habiticaTask.userId
    };
}


main();