import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodosService } from './todos.service';
import { TodoDto } from './dto/todo.dto';
import { CreateTodoInputDto } from './dto/create-todo-input.dto';
import { UpdateTodoInputDto } from './dto/update-todo-input.dto';

@Resolver(() => TodoDto)
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Query(() => [TodoDto], { name: 'todos' })
  public findAll(): Promise<TodoDto[]> {
    return this.todosService.findAll();
  }

  @Query(() => TodoDto, { name: 'todo' })
  public findOne(
    @Args('todoId', { type: () => Int }) todoId: number,
  ): Promise<TodoDto> {
    return this.todosService.findOne(todoId);
  }

  @Mutation(() => TodoDto)
  public createTodo(
    @Args('createTodoInput') createTodoInput: CreateTodoInputDto,
  ): Promise<TodoDto> {
    return this.todosService.create(createTodoInput);
  }

  @Mutation(() => TodoDto)
  public updateTodo(
    @Args('todoId') todoId: number,
    @Args('updateTodoInput') updateTodoInput: UpdateTodoInputDto,
  ): Promise<TodoDto> {
    return this.todosService.update(todoId, updateTodoInput);
  }

  @Mutation(() => Boolean)
  public async deleteTodo(
    @Args('todoId', { type: () => Int }) todoId: number,
  ): Promise<boolean> {
    try {
      await this.todosService.delete(todoId);
      return true;
    } catch (err) {
      console.debug(err);
      return false;
    }
  }
}
