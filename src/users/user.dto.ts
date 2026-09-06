import { Role_name } from "../generated/prisma/enums";

export class CreateUserDto {
    firstname!: string;
    lastname!: string;
    email!: string;
    contact!: string;
    role!: Role_name;
    password!: string;
}

export class UpdateUserDto {
    firstname?: string;
    lastname?: string;
    email?: string;
    contact?: string;
    role?: Role_name;
    password?: string;
}