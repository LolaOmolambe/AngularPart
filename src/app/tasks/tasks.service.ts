import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Task } from "./task.model";
import {Router} from '@angular/router';

@Injectable({providedIn: "root"})
export class TasksService {
  private tasks: Task[] = [];

  constructor(private http: HttpClient, private router: Router ) {}

  addTask(title: string, description: string){
    const taskData = new FormData();
    taskData.append("title", title);
    taskData.append("description", description);

    this.http.post<{message: string; task: Task}>(
      "http://localhost:3000/api/tasks", taskData
    ).subscribe(responseData => {
      this.router.navigate["/tasklist"]; //change this later
    })
  }

  getTasks(tasksPerPage: number, currentPage: number) {
    this.http.get<{message: string; tasks: any}>(
      "http://localhost:3000/api/tasks"
    )
  }

}
