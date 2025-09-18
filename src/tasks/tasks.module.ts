import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TASK_REPOSITORY } from './domain/task.tokens';
import { FirebaseTaskRepository } from './infrastructure/firebase-task.repository';
import { FirebaseModule } from '../shared/services/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [TasksController], // 
  providers: [
    TasksService,
    FirebaseTaskRepository,
    { provide: TASK_REPOSITORY, useExisting: FirebaseTaskRepository },
  ],
})
export class TasksModule {}
