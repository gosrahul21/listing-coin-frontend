import Button from "../widgets/Button";
import Checkbox from "../widgets/Checkbox";
import Label from "../widgets/Label";
import { AddProductIcon } from "../widgets/icons/AddProductIcon";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  isNonNegativeNumber,
  isNonNegativeNumberOrEmpty,
  isPositiveNumber,
} from "../utils/validations/numberValidation";
import { CreateProductDto } from "../types/dto/product/createProductDto";
import {
  HydrogenType,
  ProductionEnergySource,
  ProductionMethod,
} from "../types/enums/product";
import { TransportType } from "../types/enums/transportType";
import { addProduct } from "../services/productService";
import { enqueueSnackbar } from "notistack";
import { ScaleLoader } from "react-spinners";
import { getCombinedDateTime } from "../utils/date";

const AddProduct = (props: { onCancel: any; onAddProductComplete: any }) => {
  const [loading, setLoading] = useState(false);
  const [productFormData, setProductFormData] = useState<any>({
    sourceOfEnergy: "",
    type: "",
    productionMethod: "",
    transportation: "",
    amountProduced: "",
    amountAvailable: "",
    countryOfProduction: "",
    cityOfProduction: "",
    dateOfProduction: null,
    timeOfProduction: null,
    storageTimeFrom: null,
    storageTimeTo: null,
  });

  const inputContainerStyle = "flex flex-col gap-[26px] py-[15px]";

  const handleInputChange = (fieldName: string, value: any, type: string) => {
    if (type === "number") {
      if (!isNonNegativeNumberOrEmpty(value)) return;
    } else if (type === "text") {
      // text validation
    } else if (type === "checkbox") {
      if (value === productFormData[fieldName]) value = "";
    }

    setProductFormData((productData: Record<string, unknown>) => ({
      ...productData,
      [fieldName]: value,
    }));
  };

  const onProductFormSubmit = async () => {
    if (!validateProductFormData(productFormData)) return;
    const createProductDto: CreateProductDto = {
      energySource: productFormData.sourceOfEnergy as ProductionEnergySource,
      type: productFormData.type as HydrogenType,
      productionMethod: productFormData.productionMethod as ProductionMethod,
      transportType: productFormData.transportation as TransportType,
      amountProduced: Number.parseFloat(productFormData.amountProduced),
      amountAvailable: Number.parseFloat(productFormData.amountAvailable),
      countryOfProduction: productFormData.countryOfProduction,
      cityOfProduction: productFormData.cityOfProduction,
      producedOn: getCombinedDateTime(
        productFormData.dateOfProduction,
        productFormData.timeOfProduction
      )!, // time of production
      storedFrom: getCombinedDateTime(
        productFormData.dateOfProduction,
        productFormData.storageTimeFrom!
      ),
      storedTo: getCombinedDateTime(
        productFormData.dateOfProduction,
        productFormData.storageTimeTo!
      ),
      perUnitPrice: parseFloat(productFormData.perUnitPrice),
    };
    // apply validation
    setLoading(true);
    const toastInstance = toast.loading("Adding product", {
      position: toast.POSITION.BOTTOM_LEFT,
    });
    const { status, data } = await addProduct(createProductDto);
    setLoading(false);
    toast.dismiss(toastInstance);
    if (status && data) {
      enqueueSnackbar("New Product added succesfully", { variant: "success" });
      props.onAddProductComplete();
      props.onCancel();
    } else {
      enqueueSnackbar("Failed to add new product", { variant: "error" });
    }
  };

  const validateProductFormData = (productFormData: any) => {
    if (!productFormData.sourceOfEnergy) {
      enqueueSnackbar("Source of energy cannot be empty", { variant: "error" });
      return false;
    }

    if (!productFormData.type) {
      enqueueSnackbar("Please select a type", { variant: "error" });
      return false;
    }

    if (!productFormData.productionMethod) {
      enqueueSnackbar("Please select a production method", {
        variant: "error",
      });
      return false;
    }

    if (!productFormData.transportation) {
      enqueueSnackbar("Please select a transport type", { variant: "error" });
      return false;
    }

    // number validation

    if (!productFormData.amountProduced) {
      enqueueSnackbar("Please enter amount produced", { variant: "error" }); // no. validation
      return false;
    }

    if (!isPositiveNumber(productFormData.amountProduced)) {
      enqueueSnackbar("Amount produced must be positive number", {
        variant: "error",
      });
      return false;
    }

    if (!productFormData.amountAvailable) {
      enqueueSnackbar("Please enter available amount", { variant: "error" }); // no. validation
      return false;
    }

    if (!isNonNegativeNumber(productFormData.amountAvailable)) {
      enqueueSnackbar("Amount available must be positive number", {
        variant: "error",
      });
      return false;
    }

    if (
      parseFloat(productFormData.amountProduced) <
      parseFloat(productFormData.amountAvailable)
    ) {
      enqueueSnackbar("amount produced cannot be less than amount available", {
        variant: "error",
      });
      return false;
    }

    if (!productFormData.countryOfProduction) {
      enqueueSnackbar("Please enter country of Production", {
        variant: "error",
      });
      return false;
    }

    if (!productFormData.cityOfProduction) {
      enqueueSnackbar("Please enter city of production", { variant: "error" });
      return false;
    }

    if (!productFormData.cityOfProduction) {
      enqueueSnackbar("Please enter city of production", { variant: "error" });
      return false;
    }

    if (!productFormData.perUnitPrice) {
      enqueueSnackbar("Please enter per unit price", { variant: "error" });
      return false;
    }

    if (!productFormData.dateOfProduction) {
      enqueueSnackbar("Please enter date of production", { variant: "error" });
      return false;
    }

    if (!productFormData.timeOfProduction) {
      enqueueSnackbar("Please enter time of production", { variant: "error" });
      return false;
    }

    if (!productFormData.storageTimeTo) {
      enqueueSnackbar("Please enter storage time to", { variant: "error" });
      return false;
    }

    return true;
  };
  return (
    <div className="rounded-[10px] overflow-hidden border-[0.5px] border-tableBorder w-[997px] relative">
      <div
        className={`flex items-center gap-2 px-5 py-[15px] bg-lightGreen w-full`}
      >
        <AddProductIcon />
        <span className="font-lato font-bold text-black text-base mr-4">
          Add New Product
        </span>
      </div>
      <div className="px-[41px] py-[25px] bg-white">
        <div className={inputContainerStyle}>
          <Label
            value="Source of Energy Used for Production :"
            variant="dark-black"
          />
          <div className="grid grid-cols-3">
            <Checkbox
              onSelect={() =>
                handleInputChange(
                  "sourceOfEnergy",
                  ProductionEnergySource.WIND,
                  "checkbox"
                )
              }
              checked={
                productFormData.sourceOfEnergy === ProductionEnergySource.WIND
              }
              variant="boldNormal"
              title="Wind"
            />
            <Checkbox
              onSelect={() =>
                handleInputChange(
                  "sourceOfEnergy",
                  ProductionEnergySource.SOLAR,
                  "checkbox"
                )
              }
              checked={
                productFormData.sourceOfEnergy === ProductionEnergySource.SOLAR
              }
              variant="boldNormal"
              title="Solar"
            />
            <Checkbox
              onSelect={() =>
                handleInputChange(
                  "sourceOfEnergy",
                  ProductionEnergySource.HYDRO,
                  "checkbox"
                )
              }
              checked={
                productFormData.sourceOfEnergy === ProductionEnergySource.HYDRO
              }
              variant="boldNormal"
              title="Hydro"
            />
          </div>
        </div>

        <div className={inputContainerStyle}>
          <Label value="Select Type:" variant="dark-black" />
          <div className="grid grid-cols-3">
            <Checkbox
              variant="boldNormal"
              onSelect={() =>
                handleInputChange("type", HydrogenType.GREEN, "checkbox")
              }
              checked={productFormData.type === HydrogenType.GREEN}
              title="Green"
            />
            <Checkbox
              variant="boldNormal"
              onSelect={() =>
                handleInputChange("type", HydrogenType.BLUE, "checkbox")
              }
              checked={productFormData.type === HydrogenType.BLUE}
              title="Blue"
            />
            <Checkbox
              variant="boldNormal"
              onSelect={() =>
                handleInputChange("type", HydrogenType.GRAY, "checkbox")
              }
              checked={productFormData.type === HydrogenType.GRAY}
              title="Gray"
            />
          </div>
        </div>

        <div className={inputContainerStyle}>
          <Label value="Production Method :" variant="dark-black" />
          <div className="grid grid-cols-3">
            <Checkbox
              variant={"mediumNormal"}
              onSelect={() =>
                handleInputChange(
                  "productionMethod",
                  ProductionMethod.SMR,
                  "checkbox"
                )
              }
              checked={
                productFormData.productionMethod === ProductionMethod.SMR
              }
              title="Steam methane reforming (SMR)"
            />
            <Checkbox
              variant={"mediumNormal"}
              onSelect={() =>
                handleInputChange(
                  "productionMethod",
                  ProductionMethod.ELECTROLYSIS,
                  "checkbox"
                )
              }
              checked={
                productFormData.productionMethod ===
                ProductionMethod.ELECTROLYSIS
              }
              title="Electrolysis"
            />
          </div>
        </div>

        <div className={inputContainerStyle}>
          <Label value="Transportation :" variant="dark-black" />
          <div className="grid grid-cols-3">
            <Checkbox
              variant={"mediumNormal"}
              onSelect={() =>
                handleInputChange(
                  "transportation",
                  TransportType.LAND,
                  "checkbox"
                )
              }
              checked={productFormData.transportation === TransportType.LAND}
              title="Land"
            />
            <Checkbox
              variant={"mediumNormal"}
              onSelect={() =>
                handleInputChange(
                  "transportation",
                  TransportType.MARITIME,
                  "checkbox"
                )
              }
              checked={
                productFormData.transportation === TransportType.MARITIME
              }
              title="Maritime"
            />
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col flex-1 gap-4">
            <div className="grid grid-cols-2 items-center">
              <Label variant="dark-black" value="Amount Produced" />
              <div className="flex items-center border-[0.5px] border-inputBorder bg-[#F0F0F0] rounded-[5px] py-1 px-2 w-full">
                <input
                  onChange={(e) =>
                    handleInputChange(
                      "amountProduced",
                      e.target.value,
                      "number"
                    )
                  }
                  value={productFormData.amountProduced}
                  className="outline-none bg-[transparent] border-r-2 border-inputBorder w-full"
                />
                <div className="z-10 left-0 right-0 top-[100%] font-semibold w-6 rounded-b-[50px] ml-2">
                  Kg
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 items-center">
              <Label variant="dark-black" value="Country of Production :" />
              <div className="flex items-center w-full border-[0.5px] border-inputBorder bg-[#F0F0F0] rounded-[5px] py-1 px-2">
                <input
                  onChange={(e) =>
                    handleInputChange(
                      "countryOfProduction",
                      e.target.value,
                      "text"
                    )
                  }
                  value={productFormData.countryOfProduction}
                  className="outline-none bg-[transparent] border-inputBorder w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 items-center">
              <Label variant="dark-black" value="Date of Production :" />
              <div className="flex items-center border-[0.5px] border-inputBorder bg-[#F0F0F0] rounded-[5px] py-1 px-2  w-full">
                {/* <DatePicker onChange={(e) => { handleInputChange('dateOfProduction', e, 'date') }} value={productFormData.dateOfProduction?.toDateString()} className="bg-[transparent]  outline-none border-r-2 border-inputBorder w-full" />
                            <div className="px-2">
                                <DatePickerIcon />
                            </div> */}
                <input
                  onChange={(e) => {
                    handleInputChange(
                      "dateOfProduction",
                      e.target.value,
                      "date"
                    );
                  }}
                  value={productFormData.dateOfProduction}
                  className="outline-none w-full bg-[#F0F0F0] appearance-none"
                  aria-label="Date"
                  type="date"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 items-center">
              <Label variant="dark-black" value="Storage Time From :" />
              <div className="flex items-center border-[0.5px] border-inputBorder bg-[#F0F0F0] rounded-[5px] py-1 px-2  w-full">
                {/* <DatePicker onChange={(e) => { handleInputChange('storageTimeFrom', e, 'date') }} value={productFormData.storageTimeFrom?.toLocaleTimeString()} className="bg-[transparent]  outline-none border-r-2 border-inputBorder w-full" />
                            <div className="px-2">
                                <DatePickerIcon />
                            </div> */}
                <input
                  onChange={(e) => {
                    handleInputChange(
                      "storageTimeFrom",
                      e.target.value,
                      "date"
                    );
                  }}
                  value={productFormData.storageTimeFrom}
                  className="outline-none w-full bg-[#F0F0F0] appearance-none"
                  aria-label="Time"
                  type="time"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <div className="grid grid-cols-2 items-center">
              <Label
                variant="dark-black"
                value="Amount Available"
                style={{ marginLeft: "20px" }}
              />
              <div className="flex items-center border-[0.5px] border-inputBorder bg-[#F0F0F0] rounded-[5px] py-1 px-2">
                <input
                  onChange={(e) =>
                    handleInputChange(
                      "amountAvailable",
                      e.target.value,
                      "number"
                    )
                  }
                  value={productFormData.amountAvailable}
                  className="outline-none bg-[transparent] border-r-2 border-inputBorder w-full"
                />
                <div className="z-10 left-0 right-0 top-[100%] font-semibold w-6 rounded-b-[50px] ml-2">
                  Kg
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 items-center">
              <Label
                variant="dark-black"
                value="City of Production :"
                style={{ marginLeft: "20px" }}
              />
              <div className="flex items-center border-[0.5px] border-inputBorder bg-[#F0F0F0] rounded-[5px] py-1  px-2 w-full">
                <input
                  onChange={(e) =>
                    handleInputChange(
                      "cityOfProduction",
                      e.target.value,
                      "text"
                    )
                  }
                  value={productFormData.cityOfProduction}
                  className="outline-none bg-[transparent] "
                />
              </div>
            </div>

            <div className="grid grid-cols-2 items-center">
              <Label
                variant="dark-black"
                value="Time of Production :"
                style={{ marginLeft: "20px" }}
              />
              <div className="flex items-center border-[0.5px] border-inputBorder bg-[#F0F0F0] rounded-[5px] py-1  px-2 w-full">
                {/* <TimePicker nativeInputAriaLabel='time' clockAriaLabel="Toggle clock" disableClock clockIcon={null} onChange={(e) => { handleInputChange('timeOfProduction', e, 'date') }} dateFormat={''} value={productFormData.timeOfProduction?.toLocaleTimeString()} className="outline-none bg-[transparent]  border-r-2 border-inputBorder w-full" /> */}
                <input
                  onChange={(e) => {
                    handleInputChange(
                      "timeOfProduction",
                      e.target.value,
                      "date"
                    );
                  }}
                  value={productFormData.timeOfProduction}
                  className="outline-none w-full bg-[#F0F0F0] appearance-none"
                  aria-label="Time"
                  type="time"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 items-center">
              <Label
                variant="dark-black"
                value="Storage Time To :"
                style={{ marginLeft: "20px" }}
              />
              <div className="flex items-center border-[0.5px] border-inputBorder bg-[#F0F0F0] rounded-[5px] py-1  px-2 w-full">
                <input
                  onChange={(e) => {
                    handleInputChange("storageTimeTo", e.target.value, "date");
                  }}
                  value={productFormData.storageTimeTo}
                  className="outline-none w-full bg-[#F0F0F0] appearance-none"
                  aria-label="Time"
                  type="time"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-5">
          <div className="flex flex-col gap-4 flex-1">
            <div className="grid grid-cols-2 items-center">
              <Label variant="dark-black" value="Per unit trade price:" />
              <div className="flex items-center border-[0.5px] border-inputBorder bg-[#F0F0F0] rounded-[5px] py-1 px-2 w-full">
                <input
                  onChange={(e) => {
                    handleInputChange("perUnitPrice", e.target.value, "number");
                  }}
                  value={productFormData.perUnitPrice}
                  className="outline-none w-full bg-[#F0F0F0] appearance-none border-r-2 border-inputBorder"
                  aria-label="Per unit price"
                />
                <div className="z-10 left-0 right-0 top-[100%] font-semibold w-6 rounded-b-[50px] ml-1 mr-2">
                  USD
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 flex-1"></div>
        </div>
        <div className="flex justify-center py-5 gap-5">
          <Button
            onClick={onProductFormSubmit}
            name="Add"
            variant="darkgreen"
            disabled={loading}
          />
          <Button
            onClick={() => {
              props.onCancel();
            }}
            color="black"
            name="Cancel"
            variant="white"
            disabled={loading}
          />
        </div>
      </div>
      {loading && (
        <div className="flex absolute top-0 left-0 right-0 bottom-0 bg-fadeTableGray z-50 items-center justify-center">
          <ScaleLoader color="#335908" />
        </div>
      )}
    </div>
  );
};

export default AddProduct;
