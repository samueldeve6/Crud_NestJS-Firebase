import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { firestore } from '../firebase/firebase.config';

@Injectable()
export class TasksService {
  private taskCollection = firestore.collection('tasks');

  async create(createTaskDto: CreateTaskDto) {
    const docRef = await this.taskCollection.add(createTaskDto as any);
    return { id: docRef.id, ...createTaskDto };
  }

  async findAll() {
    const snapshot = await this.taskCollection.get();
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  }

  async findOne(id: string) {
    const docRef = this.taskCollection.doc(id);
    const task = await docRef.get();
    if (!task.exists) throw new NotFoundException(`Task ${id} no encontrada`);
    return { id: task.id, ...task.data() } as any;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    await this.taskCollection.doc(id).update({ ...updateTaskDto } as any);
    return { id, ...updateTaskDto } as any;
  }

  async remove(id: string) {
    await this.taskCollection.doc(id).delete();
    return { message: `Task ${id} eliminada` };
  }

  async health() {
    try {
      await this.taskCollection.limit(1).get();
      return { connected: true };
    } catch (error: any) {
      return { connected: false, error: error?.message || String(error) };
    }
  }
}
