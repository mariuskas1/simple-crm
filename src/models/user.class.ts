export class User {
    firstName: string;
    lastName: string;
    email:string;
    birthDate: number;
    street: string;
    zipCode: number;
    city: string;
    id?: string;

    constructor(object?:any){
        this.firstName = object ? object.firstName : '';
        this.lastName = object ? object.lastName : '';
        this.email = object ? object.email : '';
        this.birthDate = object?.birthDate instanceof Date 
            ? object.birthDate.getTime() 
            : object?.birthDate ?? 0;
        this.street = object ? object.street : '';
        this.zipCode = object ? object.zipCode : '';
        this.city = object ? object.city : '';
    }

    toJSON(){
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            birthDate: this.birthDate,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city,
          };
    }

}