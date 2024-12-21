import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TaskStatus } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async getTasks({ status, priority, assignId }: task.FilterTaskType) {
    return await this.prisma.task.findMany({
      where: {
        status,
        priority,
        assignId,
      },
      orderBy: {
        order: 'asc',
      },
    });
  }
}
