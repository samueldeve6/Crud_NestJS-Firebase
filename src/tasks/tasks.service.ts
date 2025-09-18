import { Injectable, Inject } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TASK_REPOSITORY } from './domain/task.tokens';
import type { TaskRepository } from './domain/task.repository';

@Injectable()
export class TasksService {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly repo: TaskRepository,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    return this.repo.create(createTaskDto as any);
  }

  async findAll() {
    return this.repo.findAll();
  }

  async findOne(id: string) {
    return this.repo.findOne(id);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.repo.update(id, updateTaskDto as any);
  }

  async remove(id: string) {
    return this.repo.remove(id);
  }

  async health() {
    return this.repo.health();
  }
}
