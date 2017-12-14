/* tslint:disable */

declare var Object: any;
export interface OzanUserCredentialInterface {
  "id"?: number;
  "realm"?: string;
  "alamat"?: string;
  "phoneNumber"?: string;
  "jobPosition"?: string;
  "corporateName"?: string;
  "corporatePhoneNumber"?: string;
  "emailCorporate"?: string;
  "username"?: string;
  "email"?: string;
  "emailVerified"?: string;
  "roleUser"?: string;
  "password"?: string;
  accessTokens?: any[];
}

export class OzanUserCredential implements OzanUserCredentialInterface {
  "id": number;
  "realm": string;
  "alamat": string;
  "phoneNumber": string;
  "jobPosition": string;
  "corporateName": string;
  "corporatePhoneNumber": string;
  "emailCorporate": string;
  "username": string;
  "email": string;
  "emailVerified": string;
  "roleUser": string;
  "password": string;
  accessTokens: any[];
  constructor(data?: OzanUserCredentialInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `OzanUserCredential`.
   */
  public static getModelName() {
    return "OzanUserCredential";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of OzanUserCredential for dynamic purposes.
  **/
  public static factory(data: OzanUserCredentialInterface): OzanUserCredential{
    return new OzanUserCredential(data);
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
      name: 'OzanUserCredential',
      plural: 'OzanUserCredentials',
      path: 'OzanUserCredentials',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "alamat": {
          name: 'alamat',
          type: 'string'
        },
        "phoneNumber": {
          name: 'phoneNumber',
          type: 'string'
        },
        "jobPosition": {
          name: 'jobPosition',
          type: 'string'
        },
        "corporateName": {
          name: 'corporateName',
          type: 'string'
        },
        "corporatePhoneNumber": {
          name: 'corporatePhoneNumber',
          type: 'string'
        },
        "emailCorporate": {
          name: 'emailCorporate',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'string'
        },
        "roleUser": {
          name: 'roleUser',
          type: 'string'
        },
        "password": {
          name: 'password',
          type: 'string'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
      }
    }
  }
}
