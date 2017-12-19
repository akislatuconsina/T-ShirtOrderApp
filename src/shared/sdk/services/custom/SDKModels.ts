/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { OzanUserCredential } from '../../models/OzanUserCredential';
import { OzanContainer } from '../../models/OzanContainer';
import { OzanMenuCredential } from '../../models/OzanMenuCredential';
import { Ozanorder } from '../../models/Ozanorder';
import { Ozanorderproduct } from '../../models/Ozanorderproduct';
import { Ozanlibrary } from '../../models/Ozanlibrary';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    OzanUserCredential: OzanUserCredential,
    OzanContainer: OzanContainer,
    OzanMenuCredential: OzanMenuCredential,
    Ozanorder: Ozanorder,
    Ozanorderproduct: Ozanorderproduct,
    Ozanlibrary: Ozanlibrary,
    
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
