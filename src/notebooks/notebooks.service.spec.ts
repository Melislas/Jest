import { Test, TestingModule } from '@nestjs/testing';
import { NotebooksService } from './notebooks.service';
import { CreateNotebookDto } from './dto/create-notebook.dto';
import { UpdateNotebookDto } from './dto/update-notebook.dto';

describe('NotebooksService', () => {
    let service: NotebooksService;

    beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
    providers: [NotebooksService],
    }).compile();

    service = module.get<NotebooksService>(NotebooksService);
});

it('deberia estar definido', () => {
    expect(service).toBeDefined();
});

it('deberia crear una notebook', () => {
    const notebook: CreateNotebookDto = { marca: 'Acer', modelo: 'Aspire' };
    const result = service.create(notebook);
    expect(result).toEqual({ id: 1, ...notebook });
});

it('deberia retornar todas las notebooks', () => {
    service.create({ marca: 'Lenovo', modelo: 'ThinkPad' });
    service.create({ marca: 'HP', modelo: 'Pavilion' });
    const result = service.findAll();
    expect(result.length).toBe(2);
});

it('deberia retornar una notebook por id', () => {
    const notebook = service.create({ marca: 'Dell', modelo: 'XPS' });
    const result = service.findOne(notebook.id);
    expect(result).toEqual(notebook);
});

it('deberia retornar indefinido si la notebook no existe', () => {
    const result = service.findOne(999);
    expect(result).toBeUndefined();
});

it('deberia actualizar una notebook', () => {
    const notebook = service.create({ marca: 'OldBrand', modelo: 'OldModel' });
    const updateData: UpdateNotebookDto = { marca: 'NewBrand' };
    const updated = service.update(notebook.id, updateData);
    expect(updated.marca).toBe('NewBrand');
});

it('deberia retornar null si la notebook no existe para actualizar', () => {
    const result = service.update(999, { marca: 'X' });
    expect(result).toBeNull();
});

it('deberia remover una notebook', () => {
    const notebook = service.create({ marca: 'ToRemove', modelo: 'X' });
    const removed = service.remove(notebook.id);
    expect(removed).toEqual(notebook);
    expect(service.findAll().length).toBe(0);
});

it('deberia retornar null si la notebook no existe para remover', () => {
    const result = service.remove(999);
    expect(result).toBeNull();
});
});
