import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  forMember,
  ignore,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Todo } from '../entities/todo.entity';

import { TodoDto } from '../dto/todo.dto';
import { CreateTodoInputDto } from '../dto/create-todo-input.dto';
import { UpdateTodoInputDto } from '../dto/update-todo-input.dto';

@Injectable()
export class TodoProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Todo, TodoDto);
      createMap(
        mapper,
        CreateTodoInputDto,
        Todo,
        forMember((dest) => dest.todoId, ignore()),
      );
      createMap(mapper, UpdateTodoInputDto, Todo);
    };
  }
}
