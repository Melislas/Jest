import { Test, TestingModule } from '@nestjs/testing';
import { NotebooksController } from './notebooks.controller';
import { NotebooksService } from './notebooks.service';

describe('NotebooksController', () => {
  let controller: NotebooksController;

let currentId = 1;

let mockService = {
  create: jest.fn(dto => Promise.resolve({ id: currentId++, ...dto })),

  findAll: jest.fn(() =>
    Promise.resolve([
      { id: 1, marca: 'Lenovo', modelo: 'ThinkPad' },
      { id: 2, marca: 'HP', modelo: 'Pavilion' },
    ])
  ),

  findOne: jest.fn(id => Promise.resolve({ id, marca: 'Dell', modelo: 'XPS' })),

  update: jest.fn((id, dto) => Promise.resolve({ id, ...dto })),

  remove: jest.fn(id => Promise.resolve({ deleted: true, id })),
};


  beforeEach(async () => {
    mockService = {
      create: jest.fn(dto => Promise.resolve({ id: 1, ...dto })),
      findAll: jest.fn(() =>
        Promise.resolve([
          { id: 1, marca: 'Lenovo', modelo: 'ThinkPad' },
          { id: 2, marca: 'HP', modelo: 'Pavilion' },
        ]),
      ),
      findOne: jest.fn(id =>
        Promise.resolve({ id, marca: 'Dell', modelo: 'XPS' }),
      ),
      update: jest.fn((id, dto) =>
        Promise.resolve({ id, ...dto }),
      ),
      remove: jest.fn(id =>
        Promise.resolve({ deleted: true, id }),
      ),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotebooksController],
      providers: [
        {
          provide: NotebooksService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<NotebooksController>(NotebooksController);
  });

  it('deberia ser definido', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('debería crear una notebook', async () => {
      const dto = { marca: 'Acer', modelo: 'Aspire' };
      await expect(controller.create(dto)).resolves.toEqual({
        id: expect.any(Number),
        marca: 'Acer',
        modelo: 'Aspire',
      });
    });
  });

  describe('findAll', () => {
    it('debería devolver un array de notebooks', async () => {
      await expect(controller.findAll()).resolves.toEqual([
        { id: 1, marca: 'Lenovo', modelo: 'ThinkPad' },
        { id: 2, marca: 'HP', modelo: 'Pavilion' },
      ]);
    });
  });

  describe('findOne', () => {
    it('debería devolver una notebook por id', async () => {
      await expect(controller.findOne('1')).resolves.toEqual({
        id: '1',
        marca: 'Dell',
        modelo: 'XPS',
      });
    });
  });

  describe('update', () => {
    it('debería actualizar una notebook', async () => {
      const dto = { marca: 'Apple', modelo: 'MacBook Pro' };
      await expect(controller.update('1', dto)).resolves.toEqual({
        id: '1',
        marca: 'Apple',
        modelo: 'MacBook Pro',
      });
    });
  });

  describe('remove', () => {
    it('debería eliminar una notebook', async () => {
      await expect(controller.remove('1')).resolves.toEqual({
        deleted: true,
        id: '1',
      });
      expect(mockService.remove).toHaveBeenCalledWith('1');
    });
  });
});