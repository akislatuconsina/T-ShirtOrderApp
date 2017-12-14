/* tslint:disable */

declare var Object: any;
export interface OzanOrderProductInterface {
  "id"?: number;
  "idOrder"?: string;
  "descriptionOrder"?: string;
  "sizeOrder"?: string;
  "QtyOrder"?: string;
  "UnitPrice"?: string;
}

export class OzanOrderProduct implements OzanOrderProductInterface {
  "id": number;
  "idOrder": string;
  "descriptionOrder": string;
  "sizeOrder": string;
  "QtyOrder": string;
  "UnitPrice": string;
  constructor(data?: OzanOrderProductInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `OzanOrderProduct`.
   */
  public static getModelName() {
    return "OzanOrderProduct";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of OzanOrderProduct for dynamic purposes.
  **/
  public static factory(data: OzanOrderProductInterface): OzanOrderProduct{
    return new OzanOrderProduct(data);
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
      name: 'OzanOrderProduct',
      plural: 'OzanOrderProducts',
      path: 'OzanOrderProducts',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "idOrder": {
          name: 'idOrder',
          type: 'string'
        },
        "descriptionOrder": {
          name: 'descriptionOrder',
          type: 'string'
        },
        "sizeOrder": {
          name: 'sizeOrder',
          type: 'string'
        },
        "QtyOrder": {
          name: 'QtyOrder',
          type: 'string'
        },
        "UnitPrice": {
          name: 'UnitPrice',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
