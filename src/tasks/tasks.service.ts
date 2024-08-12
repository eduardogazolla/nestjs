import { Injectable } from '@nestjs/common';

interface Task {
  id: number;
  title: string;
  description: string;
}

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private idCounter = 1;

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: number): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(title: string, description: string): Task {
    const newTask: Task = { id: this.idCounter++, title, description };
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: number, title: string, description: string): Task | undefined {
    const task = this.getTaskById(id);
    if (task) {
      task.title = title;
      task.description = description;
    }
    return task;
  }

  deleteTask(id: number): boolean {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index >= 0) {
      this.tasks.splice(index, 1);
      return true;
    }
    return false;
  }
}

export { Task };
