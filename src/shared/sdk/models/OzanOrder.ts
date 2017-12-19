/* tslint:disable */

declare var Object: any;
export interface OzanorderInterface {
  "userid"?: string;
  "orderdate"?: Date;
  "buyername"?: string;
  "companyname"?: string;
  "address"?: string;
  "shippedto"?: string;
  "invoiceto"?: string;
  "vendorname"?: string;
  "trackingno"?: string;
  "deliverydate"?: Date;
  "amount"?: string;
  "totalamount"?: string;
  "confirmto"?: string;
  "productionstatus"?: string;
  "status"?: string;
  "id"?: number;
}

export class Ozanorder implements OzanorderInterface {
  "userid": string;
  "orderdate": Date;
  "buyername": string;
  "companyname": string;
  "address": string;
  "shippedto": string;
  "invoiceto": string;
  "vendorname": string;
  "trackingno": string;
  "deliverydate": Date;
  "amount": string;
  "totalamount": string;
  "confirmto": string;
  "productionstatus": string;
  "status": string;
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
          type: 'string'
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
          type: 'string'
        },
        "totalamount": {
          name: 'totalamount',
          type: 'string'
        },
        "confirmto": {
          name: 'confirmto',
          type: 'string'
        },
        "productionstatus": {
          name: 'productionstatus',
          type: 'string'
        },
        "status": {
          name: 'status',
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
