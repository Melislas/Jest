import { Test, TestingModule } from '@nestjs/testing';
import { NotebooksController } from './notebooks.controller';
import { NotebooksService } from './notebooks.service';

describe('NotebooksController', () => {
  let controller: NotebooksController;

  let currentId = 1;

const mockService = {
  create: jest.fn(dto => {
    const newNotebook = { id: currentId++, ...dto }; 
    return newNotebook;
  }),

  findAll: jest.fn(() => [
    { id: 1, marca: 'Lenovo', modelo: 'ThinkPad' },
    { id: 2, marca: 'HP', modelo: 'Pavilion' },
  ]),

  findOne: jest.fn(id => ({ id, marca: 'Dell', modelo: 'XPS' })),

  update: jest.fn((id, dto) => ({ id, ...dto })),

  remove: jest.fn(id => ({ deleted: true, id })),
};


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotebooksController],
      providers: [
        NotebooksService,
        { provide: NotebooksService, useValue: mockService }
      ],
    }).compile();

    controller = module.get<NotebooksController>(NotebooksController);
  });

  it('deberia estar definido ', () => {
    expect(controller).toBeDefined();
  });
  
  describe('create', () => {
    it('debería crear una notebook', () => {
      const dto = { marca: 'Acer', modelo: 'Aspire' };
      expect(controller.create(dto)).toEqual({
        id: expect.any(Number),
        marca: 'Acer',
        modelo: 'Aspire',
      });
      expect(mockService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('debería devolver un array de notebooks', () => {
      expect(controller.findAll()).toEqual([
        { id: 1, marca: 'Lenovo', modelo: 'ThinkPad' },
        { id: 2, marca: 'HP', modelo: 'Pavilion' },
      ]);
      expect(mockService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('debería devolver una notebook por id', () => {
      expect(controller.findOne('1')).toEqual({
        id: '1',
        marca: 'Dell',
        modelo: 'XPS',
      });
      expect(mockService.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('debería actualizar una notebook', () => {
      const dto = { marca: 'Apple', modelo: 'MacBook Pro' };
      expect(controller.update('1', dto)).toEqual({
        id: '1',
        marca: 'Apple',
        modelo: 'MacBook Pro',
      });
      expect(mockService.update).toHaveBeenCalledWith('1', dto);
    });
  });

  describe('remove', () => {
    it('debería eliminar una notebook', () => {
      expect(controller.remove('1')).toEqual({ deleted: true, id: '1' });
      expect(mockService.remove).toHaveBeenCalledWith('1');
    });
  });
});