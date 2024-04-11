import Button from "../widgets/Button";
import "react-datepicker/dist/react-datepicker.css";
import { UploadIcon } from "../widgets/icons/UploadIcon";
import Input from "../widgets/Input";
import { UploadDocumentIcon } from "../widgets/icons/UploadDocument";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { uploadFile } from "../services/uploadService";
import { updateProductStatus } from "../services/productService";
import { ApprovalStatus } from "../types/enums/product";
import { toast } from "react-toastify";

const UploadCertificate = (props: {
    productId: string,
    onCancel: Function,
    onCertificateUploadComplete: Function
}) => {
    const [file, setFile] = useState<any>();
    const uploadDocAndCertify = async () => {
        if (!file) return enqueueSnackbar("No file selected", { variant: "error" });
        
        const toastInstance = toast.loading("Uploading certificate", {
            position: toast.POSITION.BOTTOM_LEFT,
        });

        const { data, status } = await uploadFile(file);
        toast.dismiss(toastInstance);

        if (!status)
            return enqueueSnackbar("Certificate upload failed", { variant: "error" })
        const updateProductResponse = await updateProductStatus({
            productId: props.productId,
            approvalStatus: ApprovalStatus.APPROVED,
            certificateLink: data.file
        })

        if (updateProductResponse.status){
            props.onCertificateUploadComplete();
            enqueueSnackbar("Product certified successfully", { variant: "success" });
        } else {
            enqueueSnackbar("Product certification failed", { variant: "error" });
        }
        props.onCancel();

    }
    return <div className="rounded-[10px] overflow-hidden border-[0.5px] border-tableBorder w-[997px] ">
        <div className={`flex items-center gap-2 px-5 py-[12.5px] bg-lightGreen w-full`}>
            <UploadIcon />
            <span className="font-lato font-bold text-black text-base mr-4">Upload Certificate</span>
        </div>
        <div className="px-[41px] pb-[25px] pt-[50px] bg-white">
            <div className="flex gap-6">
                <Input border={'border-inputBorder'} borderSize="0.5px" background="bg-sandGray" type="text" value={file ? file.name : null} onChange={() => { }} placeholder="Upload Document" />
                <input onChange={(e) => e.target?.files?.length && setFile(e.target?.files[0])} id="file-input" className="hidden" type="file" />
                <label htmlFor="file-input" className="bg-darkgreen rounded-full h-10 w-10 flex items-center justify-center cursor-pointer">
                    {/* <label className="cursor-pointer" htmlFor="file-input" > */}
                    <UploadDocumentIcon />
                    {/* </label> */}
                </label>
            </div>

            <span className="font-lato font-bold text-xs leading-[14.4px] text-xlightgray pt-2">Allowed type .doc, .docx, .pdf (maximum file size 100MB)</span>
            <div className="flex justify-center mt-5 py-5 gap-5">
                <Button onClick={() => { props.onCancel() }} color="black" name="Cancel" variant="white" />
                <Button onClick={uploadDocAndCertify} name="Certify" disabled={!file} variant="darkgreen" />

            </div>
        </div>
    </div>
}

export default UploadCertificate;