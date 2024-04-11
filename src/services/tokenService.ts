import { RequestType } from "../types/enums/requestType";
import { apiCaller, instance1 } from "../utils/axiosInstance";
import { ListUserDto } from "../types/dto/user/listUserDto";

export const listToken = async (listTokenDto: ListUserDto) => {
    try {
        const data: any[] = await apiCaller(RequestType.GET, '/tokens', instance1, undefined, listTokenDto);
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


export const getTokenPriceById = async (tokenId: string)=>{
    try {
        const data: Array<{ users: any[], count: any[] }> = await apiCaller(RequestType.GET, `/price-history/${tokenId}`, instance1,);
        return {
            status: true,
            data
        };
    } catch (error: any) {
        return {
            status: false,
            data: error.response.data
        }
    }
}

export const getTokenById = async (tokenId: string)=>{
    try {
        const data: Array<{ users: any[], count: any[] }> = await apiCaller(RequestType.GET, `/tokens/${tokenId}`, instance1,);
        return {
            status: true,
            data
        };
    } catch (error: any) {
        return {
            status: false,
            data: error.response.data
        }
    }
}

export const addToken = async (addTokenDto: any)=>{
    try {
        const data: Array<{ users: any[], count: any[] }> = await apiCaller(RequestType.POST, `/tokens`, instance1, addTokenDto);
        return {
            status: true,
            data
        };
    } catch (error: any) {
        return {
            status: false,
            data: error.response.data
        }
    }
}

export const priceSeries = async (tokenId: any)=>{
    try {
        const data: Array<{ users: any[], count: any[] }> = await apiCaller(RequestType.GET, `/price-history/series/${tokenId}`, instance1,);
        return {
            status: true,
            data
        };
    } catch (error: any) {
        return {
            status: false,
            data: error.response.data
        }
    }
}


