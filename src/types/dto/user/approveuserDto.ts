import { UserStatus } from "../../enums/userStatusType";

export interface UpdateUserStatusDto {
    userId: string;

    status: UserStatus; 
    
}