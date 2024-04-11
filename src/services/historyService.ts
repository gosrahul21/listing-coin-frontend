import { RequestType } from "../types/enums/requestType";
import { apiCaller, instance1 } from "../utils/axiosInstance";

import { ListHistoryDto } from "../types/dto/product/historyDto";

export const getHistory = async (listHistoryDto: ListHistoryDto) => {
  try {
    const data: any = await apiCaller(
      RequestType.GET,
      "/history/list",
      instance1,
      undefined,
      listHistoryDto
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
