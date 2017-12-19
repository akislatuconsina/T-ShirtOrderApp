/* tslint:disable */

declare var Object: any;
export interface OzanlibraryInterface {
  "idorder"?: string;
  "namefile"?: string;
  "id"?: number;
}

export class Ozanlibrary implements OzanlibraryInterface {
  "idorder": string;
  "namefile": string;
  "id": number;
  constructor(data?: OzanlibraryInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Ozanlibrary`.
   */
  public static getModelName() {
    return "Ozanlibrary";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Ozanlibrary for dynamic purposes.
  **/
  public static factory(data: OzanlibraryInterface): Ozanlibrary{
    return new Ozanlibrary(data);
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
      name: 'Ozanlibrary',
      plural: 'Ozanlibraries',
      path: 'Ozanlibraries',
      idName: 'id',
      properties: {
        "idorder": {
          name: 'idorder',
          type: 'string'
        },
        "namefile": {
          name: 'namefile',
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
