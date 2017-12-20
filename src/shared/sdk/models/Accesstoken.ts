/* tslint:disable */

declare var Object: any;
export interface AccesstokenInterface {
  "ttl"?: number;
  "scopes"?: string;
  "created"?: Date;
  "userid"?: number;
  "id"?: string;
}

export class Accesstoken implements AccesstokenInterface {
  "ttl": number;
  "scopes": string;
  "created": Date;
  "userid": number;
  "id": string;
  constructor(data?: AccesstokenInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Accesstoken`.
   */
  public static getModelName() {
    return "Accesstoken";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Accesstoken for dynamic purposes.
  **/
  public static factory(data: AccesstokenInterface): Accesstoken{
    return new Accesstoken(data);
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
      name: 'Accesstoken',
      plural: 'Accesstokens',
      path: 'Accesstokens',
      idName: 'id',
      properties: {
        "ttl": {
          name: 'ttl',
          type: 'number'
        },
        "scopes": {
          name: 'scopes',
          type: 'string'
        },
        "created": {
          name: 'created',
          type: 'Date'
        },
        "userid": {
          name: 'userid',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
