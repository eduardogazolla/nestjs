<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Descrição

Aplicação em [NestJS](https://github.com/nestjs/nest) - modulo de tarefas.

## Passo 1: Configuração do Ambiente

1. Instale o Node.js se ainda não o tiver. O NestJS requer Node.js 12.x ou superior.
2. Instale o Nest CLI globalmente para facilitar a criação de novos projetos NestJS:

```bash
npm i
```

```bash
npm install -g @nestjs/cli
```

## Passo 2: Criação do Projeto

1. Crie um novo projeto com o Nest CLI:

```bash
nest new tasks-app
```

O CLI perguntará sobre o gerenciador de pacotes a ser usado. Escolha npm ou yarn, conforme preferir.

2. Navegue até o diretório do projeto:

```bash
cd tasks-app
```

## Passo 3: Criação do Módulo de Tarefas

1. Crie um novo módulo, controlador e serviço para as tarefas

```bash
nest generate module tasks
nest generate controller tasks
nest generate service tasks
```

Isso criará os seguintes arquivos:

- src/tasks/tasks.module.ts
- src/tasks/tasks.controller.ts
- src/tasks/tasks.service.ts

2. Defina o serviço de tarefas (tasks.service.ts) para armazenar e gerenciar tarefas:

```bash
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

```

3. Atualize o controlador de tarefas (tasks.controller.ts) para lidar com as requisições HTTP:

```bash
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

```

4. Configure o módulo de tarefas (tasks.module.ts) para registrar o controlador e o serviço:

```bash
import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
```

## Passo 4: Configure o Módulo Principal

1. Atualize o módulo principal (app.module.ts) para incluir o módulo de tarefas:

```bash
import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

```

## Passo 5: Inicie a Aplicação

1. Inicie o servidor NestJS:

```bash
npm run start
```

2. Teste a API:

- Para obter todas as tarefas, faça uma requisição GET para http://localhost:3000/tasks.

- Para criar uma nova tarefa, faça uma requisição POST para http://localhost:3000/tasks com um corpo JSON como {"title": "Tarefa 1", "description": "Descrição da tarefa 1"}.

- Para obter uma tarefa por ID, faça uma requisição GET para http://localhost:3000/tasks/{id} substituindo {id} pelo ID da tarefa.

## Suporte

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Fique ligado

- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## Licença

Nest is [MIT licensed](LICENSE).
