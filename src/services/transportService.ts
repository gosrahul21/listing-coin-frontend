import { RequestType } from "../types/enums/requestType";
import { apiCaller, instance1 } from "../utils/axiosInstance";

import { ListFleetsDto } from "../types/dto/transport/listFleetsDto";

export const getFleetList = async (listFleetsDto: ListFleetsDto) => {
  try {
    const data: any = await apiCaller(
      RequestType.GET,
      "/transport/fleet/list",
      instance1,
      undefined,
      listFleetsDto
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
