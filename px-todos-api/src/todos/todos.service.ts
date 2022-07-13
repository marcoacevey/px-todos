import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ReposService } from 'src/repos/repos.service';
import { CreateTodoInputDto } from './dto/create-todo-input.dto';
import { TodoDto } from './dto/todo.dto';
import { UpdateTodoInputDto } from './dto/update-todo-input.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    private readonly reposService: ReposService,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  public async findAll(): Promise<TodoDto[]> {
    try {
      return this.classMapper.mapArrayAsync(
        await this.reposService.todosRepo.find({
          order: { createdAt: 'DESC', done: 'DESC' },
        }),
        Todo,
        TodoDto,
      );
    } catch (ex) {
      throw new Error(`findAll error: ${ex.message}.`);
    }
  }

  public async findOne(todoId: number): Promise<TodoDto> {
    try {
      const todo = await this.reposService.todosRepo.findOne({
        where: { todoId },
      });

      if (!todo) {
        throw new NotFoundException(`Todo with id ${todoId}`);
      }

      return this.classMapper.map(todo, Todo, TodoDto);
    } catch (ex) {
      throw new Error(`findOne: ${ex.message}.`);
    }
  }

  public async create(newTodoDto: CreateTodoInputDto): Promise<TodoDto> {
    try {
      const newTodo = this.classMapper.map(
        newTodoDto,
        CreateTodoInputDto,
        Todo,
      );
      return this.classMapper.mapAsync(
        await this.reposService.todosRepo.save(newTodo),
        Todo,
        TodoDto,
      );
    } catch (ex) {
      throw new Error(`create error: ${ex.message}.`);
    }
  }

  public async update(
    todoId: number,
    updateTodoDto: UpdateTodoInputDto,
  ): Promise<TodoDto> {
    try {
      updateTodoDto.todoId = todoId;
      const updateDto = this.classMapper.map(
        updateTodoDto,
        UpdateTodoInputDto,
        Todo,
      );
      return this.classMapper.mapAsync(
        await this.reposService.todosRepo.save(updateDto),
        Todo,
        TodoDto,
      );
    } catch (ex) {
      throw new Error(`Update error: ${ex.message}.`);
    }
  }

  public async delete(todoId: number): Promise<void> {
    try {
      const todoToRemove = await this.reposService.todosRepo.findOne({
        where: {
          todoId,
        },
      });
      if (!todoToRemove)
        throw new Error(
          `Error during remove, item not found => id: ${todoId}}`,
        );

      await this.reposService.todosRepo.remove([todoToRemove]);
    } catch (ex) {
      throw new Error(`remove error: ${ex.message}.`);
    }
  }
}
