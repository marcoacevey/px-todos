import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateTodoInputDto = {
  done: Scalars['Boolean'];
  todoDesc: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo: TodoDto;
  deleteTodo: Scalars['Boolean'];
  updateTodo: TodoDto;
};


export type MutationCreateTodoArgs = {
  createTodoInput: CreateTodoInputDto;
};


export type MutationDeleteTodoArgs = {
  todoId: Scalars['Int'];
};


export type MutationUpdateTodoArgs = {
  todoId: Scalars['Float'];
  updateTodoInput: UpdateTodoInputDto;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  todo: TodoDto;
  todos: Array<TodoDto>;
};


export type QueryTodoArgs = {
  todoId: Scalars['Int'];
};

export type TodoDto = {
  __typename?: 'TodoDto';
  done: Scalars['Boolean'];
  todoDesc: Scalars['String'];
  todoId: Scalars['Float'];
};

export type UpdateTodoInputDto = {
  done: Scalars['Boolean'];
  todoDesc: Scalars['String'];
  todoId: Scalars['Float'];
};

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type ListTodosQueryVariables = Exact<{ [key: string]: never; }>;


export type ListTodosQuery = { __typename?: 'Query', todos: Array<{ __typename?: 'TodoDto', todoId: number, done: boolean, todoDesc: string }> };

export type ListTodoQueryVariables = Exact<{
  todoId: Scalars['Int'];
}>;


export type ListTodoQuery = { __typename?: 'Query', todo: { __typename?: 'TodoDto', todoId: number, done: boolean, todoDesc: string } };

export type CreateTodoMutationVariables = Exact<{
  createTodoInput: CreateTodoInputDto;
}>;


export type CreateTodoMutation = { __typename?: 'Mutation', createTodo: { __typename?: 'TodoDto', todoId: number, done: boolean, todoDesc: string } };

export type UpdateTodoMutationVariables = Exact<{
  todoId: Scalars['Float'];
  updateTodoInput: UpdateTodoInputDto;
}>;


export type UpdateTodoMutation = { __typename?: 'Mutation', updateTodo: { __typename?: 'TodoDto', todoId: number, done: boolean, todoDesc: string } };

export type DeleteTodoMutationVariables = Exact<{
  todoId: Scalars['Int'];
}>;


export type DeleteTodoMutation = { __typename?: 'Mutation', deleteTodo: boolean };

export const HelloDocument = gql`
    query hello {
  hello
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class HelloGQL extends Apollo.Query<HelloQuery, HelloQueryVariables> {
    document = HelloDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ListTodosDocument = gql`
    query listTodos {
  todos {
    todoId
    done
    todoDesc
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ListTodosGQL extends Apollo.Query<ListTodosQuery, ListTodosQueryVariables> {
    document = ListTodosDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ListTodoDocument = gql`
    query listTodo($todoId: Int!) {
  todo(todoId: $todoId) {
    todoId
    done
    todoDesc
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ListTodoGQL extends Apollo.Query<ListTodoQuery, ListTodoQueryVariables> {
    document = ListTodoDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateTodoDocument = gql`
    mutation createTodo($createTodoInput: CreateTodoInputDto!) {
  createTodo(createTodoInput: $createTodoInput) {
    todoId
    done
    todoDesc
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateTodoGQL extends Apollo.Mutation<CreateTodoMutation, CreateTodoMutationVariables> {
    document = CreateTodoDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateTodoDocument = gql`
    mutation updateTodo($todoId: Float!, $updateTodoInput: UpdateTodoInputDto!) {
  updateTodo(todoId: $todoId, updateTodoInput: $updateTodoInput) {
    todoId
    done
    todoDesc
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateTodoGQL extends Apollo.Mutation<UpdateTodoMutation, UpdateTodoMutationVariables> {
    document = UpdateTodoDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteTodoDocument = gql`
    mutation deleteTodo($todoId: Int!) {
  deleteTodo(todoId: $todoId)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteTodoGQL extends Apollo.Mutation<DeleteTodoMutation, DeleteTodoMutationVariables> {
    document = DeleteTodoDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }