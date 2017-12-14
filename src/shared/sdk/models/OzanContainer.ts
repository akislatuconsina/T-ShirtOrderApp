/* tslint:disable */

declare var Object: any;
export interface OzanContainerInterface {
  "id"?: number;
}

export class OzanContainer implements OzanContainerInterface {
  "id": number;
  constructor(data?: OzanContainerInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `OzanContainer`.
   */
  public static getModelName() {
    return "OzanContainer";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of OzanContainer for dynamic purposes.
  **/
  public static factory(data: OzanContainerInterface): OzanContainer{
    return new OzanContainer(data);
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
      name: 'OzanContainer',
      plural: 'OzanContainers',
      path: 'OzanContainers',
      idName: 'id',
      properties: {
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
