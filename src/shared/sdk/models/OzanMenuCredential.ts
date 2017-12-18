/* tslint:disable */

declare var Object: any;
export interface OzanMenuCredentialInterface {
  "id"?: number;
  "title"?: string;
  "component"?: string;
  "icons"?: string;
  "roleUser"?: string;
}

export class OzanMenuCredential implements OzanMenuCredentialInterface {
  "id": number;
  "title": string;
  "component": string;
  "icons": string;
  "roleUser": string;
  constructor(data?: OzanMenuCredentialInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `OzanMenuCredential`.
   */
  public static getModelName() {
    return "OzanMenuCredential";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of OzanMenuCredential for dynamic purposes.
  **/
  public static factory(data: OzanMenuCredentialInterface): OzanMenuCredential{
    return new OzanMenuCredential(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'OzanMenuCredential',
      plural: 'OzanMenuCredentials',
      path: 'OzanMenuCredentials',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "title": {
          name: 'title',
          type: 'string'
        },
        "component": {
          name: 'component',
          type: 'string'
        },
        "icons": {
          name: 'icons',
          type: 'string'
        },
        "roleUser": {
          name: 'roleUser',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
