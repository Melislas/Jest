// notebooks.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notebook } from './entities/notebook.entity';
import { CreateNotebookDto } from './dto/create-notebook.dto';
@Injectable()
export class NotebooksService {
  private notebooks: Notebook[] = [];
  private currentId = 1;

  create(dto: CreateNotebookDto): Notebook {
    const newNotebook: Notebook = { id: this.currentId++, ...dto };
    this.notebooks.push(newNotebook);
    return newNotebook;
  }

  findAll(): Notebook[] {
    return this.notebooks;
  }

  findOne(id: string): Notebook {
    const notebook = this.notebooks.find(n => n.id === Number(id));
    if (!notebook) throw new NotFoundException(`Notebook con id ${id} no encontrada`);
    return notebook;
  }

  update(id: string, dto: Partial<CreateNotebookDto>): Notebook {
    const index = this.notebooks.findIndex(n => n.id === Number(id));
    if (index === -1) throw new NotFoundException(`Notebook con id ${id} no encontrada`);
    this.notebooks[index] = { ...this.notebooks[index], ...dto };
    return this.notebooks[index];
  }

  remove(id: string): { deleted: boolean } {
    const index = this.notebooks.findIndex(n => n.id === Number(id));
    if (index === -1) throw new NotFoundException(`Notebook con id ${id} no encontrada`);
    this.notebooks.splice(index, 1);
    return { deleted: true };
  }
}
