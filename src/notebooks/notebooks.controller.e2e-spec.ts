import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('NotebooksController (E2E)', () => {
let app: INestApplication;
let createdId: number;

beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
});

it('/notebooks (POST)', async () => {
const response = await request(app.getHttpServer())
.post('/notebooks')
.send({ title: 'E2E Notebook', content: 'Contenido e2e' })
.expect(201);

    createdId = response.body.id;
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('E2E Notebook');
});

it('/notebooks (GET)', async () => {
    const response = await request(app.getHttpServer())
.get('/notebooks')
.expect(200);

    expect(Array.isArray(response.body)).toBe(true);
});

it('/notebooks/:id (GET)', async () => {
    const response = await request(app.getHttpServer())
.get(`/notebooks/${createdId}`)
.expect(200);

    expect(response.body.id).toBe(createdId);
});

it('/notebooks/:id (PATCH)', async () => {
    const response = await request(app.getHttpServer())
.patch(`/notebooks/${createdId}`)
.send({ title: 'Updated E2E' })
.expect(200);

    expect(response.body.title).toBe('Updated E2E');
});

it('/notebooks/:id (DELETE)', async () => {
    await request(app.getHttpServer())
    .delete(`/notebooks/${createdId}`)
.expect(200);

    await request(app.getHttpServer())
    .get(`/notebooks/${createdId}`)
    .expect(404);
});

afterAll(async () => {
    await app.close();
});
});
