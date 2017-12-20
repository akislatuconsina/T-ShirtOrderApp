/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { OzanContainer } from '../../models/OzanContainer';
import { Acl } from '../../models/Acl';
import { Ozanmenulist } from '../../models/Ozanmenulist';
import { Ozanorderproduct } from '../../models/Ozanorderproduct';
import { Accesstoken } from '../../models/Accesstoken';
import { Ozanlibrary } from '../../models/Ozanlibrary';
import { Ozanorder } from '../../models/Ozanorder';
import { Ozanusercredential } from '../../models/Ozanusercredential';
import { Rolemapping } from '../../models/Rolemapping';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    OzanContainer: OzanContainer,
    Acl: Acl,
    Ozanmenulist: Ozanmenulist,
    Ozanorderproduct: Ozanorderproduct,
    Accesstoken: Accesstoken,
    Ozanlibrary: Ozanlibrary,
    Ozanorder: Ozanorder,
    Ozanusercredential: Ozanusercredential,
    Rolemapping: Rolemapping,
    
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
