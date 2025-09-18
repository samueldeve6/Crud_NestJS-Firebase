import { Task } from './task.entity';

export interface TaskRepository {
  create(dto: Omit<Task, 'id'>): Promise<Task>;
  findAll(): Promise<Task[]>;
  findOne(id: string): Promise<Task>;
  update(id: string, dto: Partial<Omit<Task, 'id'>>): Promise<Task>;
  remove(id: string): Promise<{ message: string }>;
  health(): Promise<{ connected: boolean; error?: string }>;
}
