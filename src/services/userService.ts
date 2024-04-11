import { CreateUserDto } from "../types/dto/user/createUserDto";
import { LoginUserDto } from "../types/dto/user/loginUserDto";
import { RequestType } from "../types/enums/requestType";
import { apiCaller, instance1, instance3 } from "../utils/axiosInstance";
import { ListUserDto } from "../types/dto/user/listUserDto";
import { UpdateUserStatusDto } from "../types/dto/user/approveuserDto";

export const login = async (userLoginDto: LoginUserDto) => {
    try {
        const data = await apiCaller(RequestType.POST, '/auth/login', instance3, userLoginDto);
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

export const signUp = async (createUserDto: CreateUserDto) => {
    try {
        const data = await apiCaller(RequestType.POST, '/auth/signup', instance3, createUserDto);
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
};

export const listUser = async (listUserDto: ListUserDto) => {
    try {
        const data: { users: Array<any>, totalCount: number } = await apiCaller(RequestType.GET, '/user/all', instance1, undefined, listUserDto);
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

//approve by admin
export const updateUserStatus = async (updateUserStatusDto: UpdateUserStatusDto) => {
    try {
        const data: Array<any> = await apiCaller(RequestType.POST, '/user/approve', instance1, updateUserStatusDto);
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


export const refreshSession = async (refreshToken: string) => {
    try {
        const response = await instance1.get('/user/refreshSession', {
            headers: {
                'refresh-token': refreshToken
            }
        })
        return {
            status: true,
            data: response.data
        };
    } catch (error: any) {
        return {
            status: false,
            message: error.response.data
        }
    }
}


export const getUserById = async (userId: string)=>{
    try {
        const data: Array<{ users: any[], count: any[] }> = await apiCaller(RequestType.GET, `/user/${userId}`, instance1,);
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