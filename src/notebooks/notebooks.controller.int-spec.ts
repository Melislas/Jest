import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotebooksModule } from './notebooks.module';
import { Notebook } from './entities/notebook.entity';

describe('NotebooksController (integration)', () => {
let app: INestApplication;

beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [
        TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        entities: [Notebook],
        synchronize: true,
        }),
        NotebooksModule,
],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
});

afterAll(async () => {
    await app.close();
});

it('debería crear y devolver una notebook (controller + service + DB)', async () => {
    const service = app.get('NotebooksService');
    const result = await service.create({ title: 'Test', content: 'Contenido' });

    expect(result).toHaveProperty('id');
    expect(result.title).toBe('Test');
});
});
