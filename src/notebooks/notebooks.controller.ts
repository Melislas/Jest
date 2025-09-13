// notebooks.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NotebooksService } from './notebooks.service';
import { CreateNotebookDto } from './dto/create-notebook.dto';
import { Notebook } from './entities/notebook.entity';

@Controller('notebooks')
export class NotebooksController {
  constructor(private readonly notebooksService: NotebooksService) {}

  // GET /notebooks
  @Get()
  async findAll(): Promise<Notebook[]> {
    try {
      return await this.notebooksService.findAll();
    } catch (error) {
      throw new HttpException(
        'Error retrieving notebooks',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // GET /notebooks/:id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Notebook> {
    try {
      return await this.notebooksService.findOne(Number(id));
    } catch (error) {
      throw new HttpException(
        `Notebook con id ${id} no encontrada`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  // POST /notebooks
  @Post()
  async create(@Body() createNotebookDto: CreateNotebookDto): Promise<Notebook> {
    try {
      return await this.notebooksService.create(createNotebookDto);
    } catch (error) {
      throw new HttpException(
        'Error creating notebook',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // PUT /notebooks/:id
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateNotebookDto>,
  ): Promise<Notebook> {
    try {
      return  this.notebooksService.update(Number(id), dto);
    } catch (error) {
      throw new HttpException(
        `Error updating notebook with id ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // DELETE /notebooks/:id
    @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ deleted: boolean }> {
    await this.notebooksService.remove(Number(id)); 
    return { deleted: true }; 
  }
}
