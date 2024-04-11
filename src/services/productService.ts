import { RequestType } from "../types/enums/requestType";
import { apiCaller, instance1 } from "../utils/axiosInstance";
import { ListProductsDto } from "../types/dto/product/listProductDto";
import { CreateProductDto } from "../types/dto/product/createProductDto";
import { UpdateProductApprovalStatusDto } from "../types/dto/product/updateApprovalStatusDto";
import { TradeProductDto } from "../types/dto/product/tradeProductDto";
import { WatchlistDto } from "../types/dto/product/watchlistDto";

export const addProduct = async (createProductDto: CreateProductDto) => {
    try {
        const data = await apiCaller(RequestType.POST, '/product/create', instance1, createProductDto);
        return {
            status: true,
            data
        };
    } catch (error: any) {
        return {
            status: false,
            message: error.response.data.message
        }
    }
};

export const listProduct = async (listUserDto: ListProductsDto) => {
    try {
        const data: any = await apiCaller(RequestType.GET, '/product/list', instance1, undefined, listUserDto);

        const products = data.products.map((product: any) => (product))
        const totalCount = data.count?.count || 0;
        return {
            status: true,
            data: { products, totalCount }
        };
    } catch (error: any) {
        return {
            status: false,
            message: error.response.data
        }
    }
}

export const getInventory = async (listUserDto: ListProductsDto) => {
    try {
        const data: any = await apiCaller(RequestType.GET, '/product/inventory', instance1, undefined, listUserDto);

        const products = data.products.map((product: any) => (product))
        const totalCount = data.count?.count || 0;
        return {
            status: true,
            data: { products, totalCount }
        };
    } catch (error: any) {
        return {
            status: false,
            message: error.response.data
        }
    }
}

//approve by certifier
export const updateProductStatus = async (updateProductApprovalStatusDto: UpdateProductApprovalStatusDto) => {
    try {
        const data: Array<any> = await apiCaller(RequestType.PATCH, '/product/approval', instance1, updateProductApprovalStatusDto);
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

export const tradeProduct = async (tradeProductDto: TradeProductDto) => {
    try {
        const data: Array<any> = await apiCaller(RequestType.POST, '/product/trade', instance1, tradeProductDto);
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

export const getProductUsage = async () => {
    try {
        const data: Record<string, string> = await apiCaller(RequestType.GET, '/product/usage', instance1);
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

export const getProducers = async () => {
    try {
        const data: Array<{ _id: string, userList: { user: Record<string, string>, productId: string }[] }> = await apiCaller(RequestType.GET, '/product/producers', instance1);
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

export const verifyProduct = async (productId: string) => {
    try {
        const data: string = await apiCaller(RequestType.GET, '/product/verify', instance1, undefined, { productId });
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


export const getWatchList = async (watchListDto: WatchlistDto) => {
    try {
        const data: Array<{ products: any[], count: any[] }> = await apiCaller(RequestType.GET, '/product/watchlist', instance1, undefined, watchListDto);
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

export const addToWatchList = async (productId: string) => {
    try {
        const data: Array<{ products: any[], count: any[] }> = await apiCaller(RequestType.POST, '/product/watchlist', instance1, { productId });
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

export const deleteFromWatchList = async (productId: string) => {
    try {
        const data: Array<{ products: any[], count: any[] }> = await apiCaller(RequestType.DELETE, `/product/watchlist/${productId}`, instance1,);
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

export const getProductById = async (productId: string)=>{
    try {
        const data: Array<{ products: any[], count: any[] }> = await apiCaller(RequestType.GET, `/product/${productId}`, instance1,);
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