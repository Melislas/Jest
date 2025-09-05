// notebooks.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
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

  findOne(id: number): Notebook {
    const notebook = this.notebooks.find(n => n.id === Number(id));
    if (!notebook) throw new NotFoundException(`Notebook con id ${id} no encontrada`);
    return notebook;
  }

  update(id: number, dto: Partial<CreateNotebookDto>): Notebook {
    const index = this.notebooks.findIndex(n => n.id === Number(id));
    if (index === -1) throw new NotFoundException(`Notebook con id ${id} no encontrada`);
    this.notebooks[index] = { ...this.notebooks[index], ...dto };
    return this.notebooks[index];
  }

  remove(id: number): { deleted: boolean } {
    const index = this.notebooks.findIndex(n => n.id === Number(id));
    if (index === -1) throw new NotFoundException(`Notebook con id ${id} no encontrada`);
    this.notebooks.splice(index, 1);
    return { deleted: true };
  }
}
