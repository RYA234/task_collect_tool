// ts-node /src/task/Haibitica/hello.ts
import type { HabiticaResponse, HabiticaTask } from './response';
console.log(process.env.HIBITICA_USER_ID);
console.log(process.env.HIBITICA_API_KEY);


export async function fetchData(): Promise<HabiticaTask[]> {
    const response = await fetch("https://habitica.com/api/v3/tasks/user ", {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "x-api-user": process.env.HIBITICA_USER_ID || "",
            "x-api-key": process.env.HIBITICA_API_KEY || "",
            "x-client": (process.env.HIBITICA_USER_ID || "") + "-Testing"
        }
    });

    console.log(`Status: ${response.status}`);
    const text = await response.text();
    // console.log(text);

    try {
        // const data: HaibiticaTaskResponse = JSON.parse(text);
        const data :HabiticaResponse = JSON.parse(text);
        // console.log(data.data.filter((task) => task.type === "todo").map((task) => task.checklist));
        console.log(data.data.filter((task) => task.type === "todo").map((task) => task));
        return data.data
        // console.log(data.data.history.todos)
        // console.log(data);
        
    } catch (error) {
        console.error("Failed to parse JSON:", error);
    }
    return []
}

 fetchData();

