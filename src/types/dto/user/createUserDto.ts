import { UserRoleType } from "../../enums/userRoleType";


export interface CompanyDetailsDto {

    name: string;

    registration: string;

    country: string;

    city: string;

    zipCode: string;

    state: string;

    street: string;

    phoneNo: string;
}

export interface CreateUserDto {

    firstName: string;

    lastName: string;

    email: string;

    password: string;

}

