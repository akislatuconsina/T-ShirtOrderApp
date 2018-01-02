/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { OzanContainer } from '../../models/OzanContainer';
import { Ozanmenulist } from '../../models/Ozanmenulist';
import { Ozanorderproduct } from '../../models/Ozanorderproduct';
import { Ozanlibrary } from '../../models/Ozanlibrary';
import { Ozanorder } from '../../models/Ozanorder';
import { Ozanusercredential } from '../../models/Ozanusercredential';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    OzanContainer: OzanContainer,
    Ozanmenulist: Ozanmenulist,
    Ozanorderproduct: Ozanorderproduct,
    Ozanlibrary: Ozanlibrary,
    Ozanorder: Ozanorder,
    Ozanusercredential: Ozanusercredential,
    
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
