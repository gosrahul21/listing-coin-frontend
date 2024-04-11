import { UserStatus } from "../../enums/userStatusType";

export interface ListUserDto {
    status?: UserStatus;

    sortByDate?: 1|-1;
    
    page?: number;

    limit?: number
}