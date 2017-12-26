/* tslint:disable */

declare var Object: any;
export interface OzanorderInterface {
  "userid"?: number;
  "orderdate"?: Date;
  "buyername"?: string;
  "companyname"?: string;
  "address"?: string;
  "shippedto"?: string;
  "invoiceto"?: string;
  "vendorname"?: string;
  "trackingno"?: string;
  "deliverydate"?: Date;
  "amount"?: number;
  "totalamount"?: number;
  "confirmto"?: string;
  "productionstatus"?: number;
  "status"?: number;
  "id"?: number;
}

export class Ozanorder implements OzanorderInterface {
  "userid": number;
  "orderdate": Date;
  "buyername": string;
  "companyname": string;
  "address": string;
  "shippedto": string;
  "invoiceto": string;
  "vendorname": string;
  "trackingno": string;
  "deliverydate": Date;
  "amount": number;
  "totalamount": number;
  "confirmto": string;
  "productionstatus": number;
  "status": number;
  "id": number;
  constructor(data?: OzanorderInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Ozanorder`.
   */
  public static getModelName() {
    return "Ozanorder";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Ozanorder for dynamic purposes.
  **/
  public static factory(data: OzanorderInterface): Ozanorder{
    return new Ozanorder(data);
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
      name: 'Ozanorder',
      plural: 'Ozanorders',
      path: 'Ozanorders',
      idName: 'id',
      properties: {
        "userid": {
          name: 'userid',
          type: 'number'
        },
        "orderdate": {
          name: 'orderdate',
          type: 'Date'
        },
        "buyername": {
          name: 'buyername',
          type: 'string'
        },
        "companyname": {
          name: 'companyname',
          type: 'string'
        },
        "address": {
          name: 'address',
          type: 'string'
        },
        "shippedto": {
          name: 'shippedto',
          type: 'string'
        },
        "invoiceto": {
          name: 'invoiceto',
          type: 'string'
        },
        "vendorname": {
          name: 'vendorname',
          type: 'string'
        },
        "trackingno": {
          name: 'trackingno',
          type: 'string'
        },
        "deliverydate": {
          name: 'deliverydate',
          type: 'Date'
        },
        "amount": {
          name: 'amount',
          type: 'number'
        },
        "totalamount": {
          name: 'totalamount',
          type: 'number'
        },
        "confirmto": {
          name: 'confirmto',
          type: 'string'
        },
        "productionstatus": {
          name: 'productionstatus',
          type: 'number'
        },
        "status": {
          name: 'status',
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
