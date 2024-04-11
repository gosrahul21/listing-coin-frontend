import { RequestType } from "../types/enums/requestType";
import { apiCaller, instance1, } from "../utils/axiosInstance";

export const uploadFile = async (file: any) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        // formData.append('fileName', file.name);
        const data: any = await apiCaller(RequestType.POST, '/upload', instance1, formData, undefined, 'multipart/form-data');
        if (data.name) { // file name
            return {
                status: true,
                data
            };
        }
        return {
            status: false,
            error: "Something went wrong"
        };
    } catch (error: any) {
        console.log(error);
        return {
            status: false,
            message: error.response.data.message
        }
    }
};