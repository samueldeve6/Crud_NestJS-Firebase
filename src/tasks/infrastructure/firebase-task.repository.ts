import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from '../domain/task.repository';
import { Task } from '../domain/task.entity';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';

@Injectable()
export class FirebaseTaskRepository implements TaskRepository {
  private readonly collection;

  constructor(private readonly firebase: FirebaseService) {
    this.collection = this.firebase.firestore.collection('tasks');
  }

  async create(dto: Omit<Task, 'id'>): Promise<Task> {
    const hasFecha = typeof dto.fechaDeCreacion === 'string' && dto.fechaDeCreacion.trim().length > 0;
    const toSave: Omit<Task, 'id'> = {
      ...dto,
      fechaDeCreacion: hasFecha ? dto.fechaDeCreacion : new Date().toISOString(),
    };
    const ref = await this.collection.add(toSave as any);
    return { id: ref.id, ...toSave };
  }

  async findAll(): Promise<Task[]> {
    const snap = await this.collection.get();
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
  }

  async findOne(id: string): Promise<Task> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) throw new NotFoundException(`Task ${id} no encontrada`);
    return { id: doc.id, ...(doc.data() as any) };
  }

  async update(id: string, dto: Partial<Omit<Task, 'id'>>): Promise<Task> {
    await this.collection.doc(id).update({ ...(dto as any) });
    // devolver el merge de lo enviado; si quieres, puedes leer de nuevo
    return { id, ...(dto as any) } as Task;
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.collection.doc(id).delete();
    return { message: `Task ${id} eliminada` };
  }

  async health(): Promise<{ connected: boolean; error?: string }> {
    try {
      await this.collection.limit(1).get();
      return { connected: true };
    } catch (e: any) {
      return { connected: false, error: e?.message ?? String(e) };
    }
  }
}
