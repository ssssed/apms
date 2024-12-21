import { Module } from '@nestjs/common';
import { PrismaService } from './modules/prisma/prisma.service';
import { UserModule } from './modules/user/user.module';
import { ProjectModule } from './modules/project/project.module';
import { NotificationModule } from './modules/notification/notification.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [UserModule, ProjectModule, NotificationModule, TaskModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
