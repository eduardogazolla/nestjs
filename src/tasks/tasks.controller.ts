import { Controller, Get, Param, Body, Post, Put } from '@nestjs/common';
import { Task } from './tasks.service';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: number): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() body: { title: string; description: string }): Task {
    const { title, description } = body;
    return this.tasksService.createTask(title, description);
  }

  @Put(':id')
  updateTask(
    @Param('id') id: number,
    @Body() body: { title: string; description: string },
  ): Task | undefined {
    const { title, description } = body;
    return this.tasksService.updateTask(id, title, description);
  }
}
