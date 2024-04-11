import { ApprovalStatus } from "../../enums/product";

export interface UpdateProductApprovalStatusDto {
  productId: string;

  approvalStatus: ApprovalStatus;

  certificateLink: string;
}
