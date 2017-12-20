/* tslint:disable */

declare var Object: any;
export interface OzanmenulistInterface {
  "title": string;
  "component": string;
  "icons": string;
  "roleuser": string;
  "id"?: number;
}

export class Ozanmenulist implements OzanmenulistInterface {
  "title": string;
  "component": string;
  "icons": string;
  "roleuser": string;
  "id": number;
  constructor(data?: OzanmenulistInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Ozanmenulist`.
   */
  public static getModelName() {
    return "Ozanmenulist";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Ozanmenulist for dynamic purposes.
  **/
  public static factory(data: OzanmenulistInterface): Ozanmenulist{
    return new Ozanmenulist(data);
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
      name: 'Ozanmenulist',
      plural: 'Ozanmenulists',
      path: 'Ozanmenulists',
      idName: 'id',
      properties: {
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
        "roleuser": {
          name: 'roleuser',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
