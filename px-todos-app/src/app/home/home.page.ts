import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import {
  CreateTodoGQL,
  DeleteTodoGQL,
  ListTodosGQL,
  TodoDto,
  UpdateTodoGQL,
} from '../graphql/generated/graphql';
import { IonLoaderService } from '../services/ion-loader.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  public todos: TodoDto[] = null;
  public todosQuery: QueryRef<any>;
  public isLoading = true;
  private querySubscription: Subscription;

  constructor(
    private readonly listTodosGQL: ListTodosGQL,
    private readonly createTodoGQL: CreateTodoGQL,
    private readonly deleteTodoGQL: DeleteTodoGQL,
    private readonly updateTodoGQL: UpdateTodoGQL,
    private readonly ionLoader: IonLoaderService,
    private readonly alertController: AlertController,
    private readonly toastController: ToastController
  ) {}
  ngOnInit() {
    this.loadTodos();
  }

  public async presentInsertTodoAlert() {
    const alert = await this.alertController.create({
      header: 'Inserir ToDo:',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
        {
          text: 'Salvar',
          handler: async (data) => {
            const { desc } = data;
            if (desc.length <= 10) {
              return false;
            } else {
              await this.createTodo(desc);
            }
          },
        },
      ],
      inputs: [
        {
          name: 'desc',
          id: 'desc',
          type: 'textarea',
          placeholder: 'Descrição da tarefa!',
          attributes: {
            rows: 4,
            maxlength: 800,
            minLength: 10,
          },
        },
      ],
    });

    await alert.present();
  }

  public async showMessage(message: string, duration = 3000) {
    const toast = await this.toastController.create({
      message,
      duration,
    });
    toast.present();
  }

  public async checkAsDoneTodo(todo: TodoDto) {
    try {
      const loader = await this.ionLoader.simpleLoader();
      const { todoId, todoDesc } = todo;

      await this.updateTodoGQL
        .mutate({
          todoId: todoId,
          updateTodoInput: {
            todoId,
            todoDesc,
            done: true,
          },
        })
        .toPromise();
      this.todosQuery.refetch();
      await this.ionLoader.dismissLoader(loader);
      this.showMessage('Todo Atualizado com sucesso :D');
    } catch (error) {
      await this.ionLoader.dismissLoader();
      console.log(error);
      this.showMessage('Ocorreu um erro :(');
    }
  }

  public async excludeTodo(todoId: number) {
    try {
      const loader = await this.ionLoader.simpleLoader();
      await this.deleteTodoGQL
        .mutate({
          todoId,
        })
        .toPromise();
      this.todosQuery.refetch();
      await this.ionLoader.dismissLoader(loader);
      this.showMessage('Todo excluído com sucesso :D');
    } catch (error) {
      await this.ionLoader.dismissLoader();
      this.showMessage('Ocorreu um erro :(');
    }
  }

  public async doRefresh(event) {
    await this.todosQuery.refetch();
    event.target.complete();
  }

  private loadTodos() {
    this.todosQuery = this.listTodosGQL.watch();
    this.querySubscription = this.todosQuery.valueChanges.subscribe(
      ({ data, loading }) => {
        this.todos = data.todos;
        this.isLoading = loading;
      },
      (error) => {
        console.log(error);
        this.showMessage('Ocorreu um erro :(');
      }
    );
  }

  private async createTodo(desc: string) {
    try {
      const loader = await this.ionLoader.simpleLoader();
      await this.createTodoGQL
        .mutate({
          createTodoInput: {
            todoDesc: desc,
            done: false,
          },
        })
        .toPromise();
      this.todosQuery.refetch();
      await this.ionLoader.dismissLoader(loader);
      this.showMessage('Todo salvo com sucesso :D');
    } catch (error) {
      console.log(error);
      await this.ionLoader.dismissLoader();
      this.showMessage('Ocorreu um erro :(');
    }
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
