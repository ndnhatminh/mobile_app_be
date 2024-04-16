import { Module } from '@nestjs/common';
import { BookModule } from './domain/book/book.module';
import { PrismaModule } from './services/prisma/prisma.module';

@Module({
    imports: [PrismaModule, BookModule],
})
export class AppModule {}
