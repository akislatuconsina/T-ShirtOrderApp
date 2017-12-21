/* tslint:disable */

declare var Object: any;
export interface OzanusercredentialInterface {
  "realm": string;
  "address": string;
  "phonenumber": number;
  "jobposition": string;
  "corporatename": string;
  "corporatephonenumber": number;
  "emailcorporate": string;
  "username": string;
  "password": string;
  "email": string;
  "emailverified": string;
  "roleuser": string;
  "verificationtoken": string;
  "id"?: number;
}

export class Ozanusercredential implements OzanusercredentialInterface {
  "realm": string;
  "address": string;
  "phonenumber": number;
  "jobposition": string;
  "corporatename": string;
  "corporatephonenumber": number;
  "emailcorporate": string;
  "username": string;
  "password": string;
  "email": string;
  "emailverified": string;
  "roleuser": string;
  "verificationtoken": string;
  "id": number;
  constructor(data?: OzanusercredentialInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Ozanusercredential`.
   */
  public static getModelName() {
    return "Ozanusercredential";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Ozanusercredential for dynamic purposes.
  **/
  public static factory(data: OzanusercredentialInterface): Ozanusercredential{
    return new Ozanusercredential(data);
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
      name: 'Ozanusercredential',
      plural: 'Ozanusercredentials',
      path: 'Ozanusercredentials',
      idName: 'id',
      properties: {
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "address": {
          name: 'address',
          type: 'string'
        },
        "phonenumber": {
          name: 'phonenumber',
          type: 'number'
        },
        "jobposition": {
          name: 'jobposition',
          type: 'string'
        },
        "corporatename": {
          name: 'corporatename',
          type: 'string'
        },
        "corporatephonenumber": {
          name: 'corporatephonenumber',
          type: 'number'
        },
        "emailcorporate": {
          name: 'emailcorporate',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "password": {
          name: 'password',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "emailverified": {
          name: 'emailverified',
          type: 'string'
        },
        "roleuser": {
          name: 'roleuser',
          type: 'string'
        },
        "verificationtoken": {
          name: 'verificationtoken',
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
