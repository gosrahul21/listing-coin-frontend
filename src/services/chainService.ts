import { RequestType } from "../types/enums/requestType";
import { apiCaller, instance1, } from "../utils/axiosInstance";
import { ListUserDto } from "../types/dto/user/listUserDto";


export const listChain = async (listTokenDto: ListUserDto) => {
    try {
        const data: {chains: any[], totalCount: number}= await apiCaller(RequestType.GET, '/chain/list', instance1, undefined, listTokenDto);
        return {
            status: true,
            data
        };
    } catch (error: any) {
        return {
            status: false,
            message: error.response.data
        }
    }
}


