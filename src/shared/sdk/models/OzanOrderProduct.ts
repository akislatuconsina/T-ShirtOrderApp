/* tslint:disable */

declare var Object: any;
export interface OzanorderproductInterface {
  "idorder"?: number;
  "descriptionorder"?: string;
  "sizeorder"?: string;
  "qtyorder"?: number;
  "amount"?: number;
  "totalamount"?: number;
  "id"?: number;
}

export class Ozanorderproduct implements OzanorderproductInterface {
  "idorder": number;
  "descriptionorder": string;
  "sizeorder": string;
  "qtyorder": number;
  "amount": number;
  "totalamount": number;
  "id": number;
  constructor(data?: OzanorderproductInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Ozanorderproduct`.
   */
  public static getModelName() {
    return "Ozanorderproduct";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Ozanorderproduct for dynamic purposes.
  **/
  public static factory(data: OzanorderproductInterface): Ozanorderproduct{
    return new Ozanorderproduct(data);
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
      name: 'Ozanorderproduct',
      plural: 'Ozanorderproducts',
      path: 'Ozanorderproducts',
      idName: 'id',
      properties: {
        "idorder": {
          name: 'idorder',
          type: 'number'
        },
        "descriptionorder": {
          name: 'descriptionorder',
          type: 'string'
        },
        "sizeorder": {
          name: 'sizeorder',
          type: 'string'
        },
        "qtyorder": {
          name: 'qtyorder',
          type: 'number'
        },
        "amount": {
          name: 'amount',
          type: 'number'
        },
        "totalamount": {
          name: 'totalamount',
          type: 'number'
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
