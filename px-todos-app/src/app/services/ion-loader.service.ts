import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class IonLoaderService {
  constructor(public readonly loadingController: LoadingController) {}

  public async simpleLoader(): Promise<HTMLIonLoadingElement> {
    const message = 'Aguarde';
    const loader = await this.loadingController.create({
      message: `${message} ...`,
    });
    await loader.present();
    return loader;
  }

  public async dismissLoader(loader?: HTMLIonLoadingElement) {
    if (loader) {
      await loader.dismiss();
    } else {
      await this.loadingController.dismiss();
    }
  }
}

/**
 * refs:
 * - https://www.positronx.io/ionic-loading-controller-tutorial-with-ion-loading-example/
 */
