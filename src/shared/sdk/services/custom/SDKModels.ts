/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { OzanUserCredential } from '../../models/OzanUserCredential';
import { OzanOrder } from '../../models/OzanOrder';
import { OzanLibrary } from '../../models/OzanLibrary';
import { OzanOrderProduct } from '../../models/OzanOrderProduct';
import { OzanContainer } from '../../models/OzanContainer';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    OzanUserCredential: OzanUserCredential,
    OzanOrder: OzanOrder,
    OzanLibrary: OzanLibrary,
    OzanOrderProduct: OzanOrderProduct,
    OzanContainer: OzanContainer,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
