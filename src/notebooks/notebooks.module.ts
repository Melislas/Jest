import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notebook } from './entities/notebook.entity';
import { NotebooksService } from './notebooks.service';
import { NotebooksController } from './notebooks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Notebook])],
  providers: [NotebooksService],
  controllers: [NotebooksController],
  exports: [NotebooksService],
})
export class NotebooksModule {}