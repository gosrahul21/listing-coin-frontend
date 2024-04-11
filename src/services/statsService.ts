import { RequestType } from "../types/enums/requestType";
import { apiCaller, instance1 } from "../utils/axiosInstance";

export const getSignupStats = async () => {
  try {
    const data: any = await apiCaller(
      RequestType.GET,
      "/stats/signups",
      instance1
    );
    return {
      status: true,
      data,
    };
  } catch (error: any) {
    return {
      status: false,
      message: error.response.data,
    };
  }
};

export const getTradeStats = async () => {
  try {
    const data: any = await apiCaller(
      RequestType.GET,
      "/stats/trade",
      instance1
    );
    return {
      status: true,
      data,
    };
  } catch (error: any) {
    return {
      status: false,
      message: error.response.data,
    };
  }
};
