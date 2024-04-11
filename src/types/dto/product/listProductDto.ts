import { ApprovalStatus } from "../../enums/product";

export class ListProductsDto  {
    recentFirst?: boolean;
    approvalStatus?: ApprovalStatus;
    includeExhausted?: boolean;
    page?: number;
    limit?: number
}
