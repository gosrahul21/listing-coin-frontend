import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Button from "../widgets/Button";
import Checkbox from "../widgets/Checkbox";
import CustomDropdown from "../widgets/CustomDropdown";
import CustomTable from "../widgets/CustomTable";
import Input from "../widgets/Input";
import { ProductIcon } from "../widgets/icons/ProductIcon";
import faker from "faker";
import {
  getProducers,
  getProductUsage,
  tradeProduct,
} from "../services/productService";
import { enqueueSnackbar } from "notistack";
import { getFleetList } from "../services/transportService";
import { useUserContext } from "../context/userContext";
import { capitalizeFirstLetter } from "../utils";
import { ScaleLoader } from "react-spinners";
import * as React from "react";

const LineChart = React.lazy(() => import("../components/LineChart"));
import Modal from "../widgets/Modal";
import Payment from "./Payment";
import { toast } from "react-toastify";
import { isNonNegativeNumber, isPositiveNumber } from "../utils/validations/numberValidation";

const CUSTOM = "Custom";

const MakeTradeComponent = (props: {
  onTabChange: (tabId: string) => void;
  selectedProductDetails: Record<string, any>;
  onTradeComplete: Function;
}) => {
  const [usage, setUsage] = useState<string>("fertilizer");
  const [productUsageList, setProductUsageList] = useState<string[]>([]);
  const [producerList, setProducerList] = useState<
    { user: Record<string, string>; productId: string }[]
  >([]);
  const [producer, setProducer] = useState<string>(
    props.selectedProductDetails?.company?.user?.userName || "Loading..."
  );
  const [tradeAmount, setTradeAmount] = useState<string>(
    props.selectedProductDetails?.balance?.remainingAmount || "0"
  );
  const [isTransportationRequired, setIsTransportationRequired] =
    useState(false);
  const [product, setProduct] = useState({ _id: "id", productId: "id" });
  const [transporter, setTransporter] = useState<any>();
  const [tradeDetails, setTradeDetails] = useState({});
  const [isCustomTrade, setIsCustomTrade] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const labels = ["Mon", "Tues", "Thrus", "Fri", "Sat", "Sun"];
  const yData = useMemo(
    () => labels.map(() => faker.datatype.number({ min: 0, max: 600 })),
    []
  );
  const data = {
    labels,
    datasets: [
      {
        data: yData,
        borderColor: "#0066FF",
      },
    ],
  };

  useEffect(() => {
    !productUsageList.length &&
      getProductUsage()
        .then((response) => {
          const usageList = Object.values(response.data || {});
          setProductUsageList(usageList);
          usageList.length && setUsage(usageList[0]);
        })
        .catch(() =>
          enqueueSnackbar("Failed to fetch the supported usage list", {
            variant: "error",
          })
        );

    if (props.selectedProductDetails || producerList.length) {
      return;
    }

    getProducers()
      .then((response) => {
        if (!response.data) return;
        const producerList = response.data[0].userList;
        setProducerList(producerList);

        if (!producerList.length) return;
        setProducer(producerList[0].user.userName);
        setProduct({
          _id: producerList[0].productId,
          productId: producerList[0].productId,
        });
      })
      .catch(() =>
        enqueueSnackbar("Failed to fetch the producers list", {
          variant: "error",
        })
      );
  }, [props.selectedProductDetails, producerList, productUsageList]);

  useEffect(() => {
    if (!props.selectedProductDetails) {
      return;
    }

    const balance = props.selectedProductDetails.balance;
    if (tradeAmount && tradeAmount > balance.remainingAmount) {
      setIsCustomTrade(true);
    } else {
      setIsCustomTrade(false);
    }

    const _id = props.selectedProductDetails._id;
    const productId = props.selectedProductDetails.productId;
    setProduct({
      _id,
      productId,
    });
  }, [props.selectedProductDetails, tradeAmount]);

  const processTrade = async () => {
    const amount = parseFloat(tradeAmount || "0");
    const _productId = props.selectedProductDetails?._id || product._id;
    if (amount <= 0 || !_productId) {
      enqueueSnackbar("Trade failed: Invalid inputs", { variant: "error" });
      return;
    }
    setLoading(true);
    const toastInstance = toast.loading("Processing trade", {
      position: toast.POSITION.BOTTOM_LEFT,
    });
    const tradeDetails = await tradeProduct({
      amount,
      productId: _productId,
      usage,
      ...(transporter?._id && { transporterId: transporter._id }),
    });
    setLoading(false);
    toast.dismiss(toastInstance);
    if (!tradeDetails.status || !tradeDetails.data) {
      return enqueueSnackbar("Trade failed, please try again after sometime", {
        variant: "error",
      });
    }

    enqueueSnackbar(
      "Trade completed successfully " +
      (tradeDetails.data as any).merkleTreeHash,
      { variant: "success" }
    );
    props.onTradeComplete();
    setTradeDetails(tradeDetails);
    closeModal();
    props.onTabChange("history");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onChangeTradeAmount = (e) => {
    if (isPositiveNumber(e.target.value) || !e.target.value)
      setTradeAmount(e.target.value);
  }

  return (
    <div className="border border-[#D1D1D1] w-full rounded-tr-2xl">
      <div
        className={`flex items-center gap-2 px-5 py-[12.5px] rounded-tr-2xl bg-lightGreen w-full`}
      >
        <ProductIcon />
        <span className="font-lato font-bold text-black text-base mr-4">
          {"Product"}
        </span>
        <span className="font-lato font-light text-black text-2xl">
          {isCustomTrade ? CUSTOM : product.productId}
        </span>
      </div>
      <div className="px-[39px] py-[56px]">
        <div className="flex flex-col gap-[30px]">
          <span className="font-lato font-bold text-base leading-[19.2px] text-pencilGray">
            Choose Your Product
          </span>
          <div className="flex">
            <div className="flex flex-col gap-5">
              <div className="flex shadow-dropdownBorder rounded-[5px] w-fit">
                <label className="min-w-[108px] text-center flex items-center px-3">
                  Usage
                </label>
                <CustomDropdown
                  variant="trade"
                  width={"w-[390px]"}
                  value={usage}
                  onSelect={(e) => {
                    setUsage(e);
                  }}
                  items={productUsageList}
                />
              </div>

              <div className="flex shadow-dropdownBorder rounded-[5px] w-fit">
                <label className="min-w-[108px] text-center flex items-center px-3">
                  Producer
                </label>
                <CustomDropdown
                  variant="trade"
                  width={"w-[390px]"}
                  value={producer}
                  onSelect={(e) => {
                    const _productId = producerList.filter(
                      (_producer) => _producer.user.userName === e
                    )[0]?.productId;
                    setProducer(e);
                    setProduct({
                      _id: _productId,
                      productId: _productId,
                    });
                  }}
                  items={producerList.map(
                    (_producer) => _producer.user.userName
                  )}
                />
              </div>

              <div className="flex shadow-dropdownBorder rounded-[5px] w-fit">
                <label
                  htmlFor="tradeAmount"
                  className="min-w-[108px] text-center flex items-center px-3"
                >
                  Amount
                </label>
                <Input
                  name="tradeAmount"
                  // type="number"
                  onChange={(e) => {
                    if (isPositiveNumber(e.target.value) || !e.target.value)
                      setTradeAmount(e.target.value);
                  }}
                  value={tradeAmount}
                  background="bg-white rounded-b-none"
                  width={"w-[350px]"}
                  borderRadius="0px"
                  border="shadow-dropdownBorder"
                  disableFocusBorder={true}
                />
                <div className="left-0 right-0 font-semibold w-10 my-2 px-3 border-inputBorder">
                  Kg
                </div>
              </div>
              {isCustomTrade ? (
                <label
                  htmlFor="tradeAmount"
                  className="text-red font-lato font-bold text-sm leading-[16.8px]"
                >
                  <ul>
                    <li>Note: You are in custom trading mode</li>
                    <li>
                      - If amount entered is more than the remaining quantity,
                      additional products will be used to complete the trade.
                    </li>
                    <li>
                      - If product is not pre selected then products will be
                      picked automatically to complete the trade.
                    </li>
                  </ul>
                </label>
              ) : (
                <></>
              )}
              <div className="flex justify-between pl-[9px] pt-[14px]">
                <div className="flex gap-2 items-center">
                  <Checkbox
                    onSelect={(e: boolean) => {
                      if (!e) {
                        setTransporter(null);
                      }
                      setIsTransportationRequired(e);
                    }}
                  />
                  <label className="text-darkgray font-lato font-bold text-sm leading-[16.8px]">
                    Do you need transportation?
                  </label>
                </div>
                <div className="flex gap-2 items-center">
                  <Checkbox />
                  <label className="text-darkgray font-lato font-bold text-sm leading-[16.8px]">
                    Do you need financing?
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-center  items-start w-full">
              {/* graph */}

              <div className="">
                <div className="flex justify-between">
                  <span className="text-darkgray font-lato font-semibold text-sm leading-[22px]">
                    {"Cost Trend"}
                  </span>
                  <div className="flex gap-1">
                    <span className="text-[8px] font-plusJakartaSans font-medium leading-[22px]">
                      Current Price
                    </span>
                    <h3 className="font-plusJakartaSans font-extrabold text-base leading-[22px] text-primaryBlue">
                      {" "}
                      ${yData.slice(-1)}
                    </h3>
                  </div>
                </div>
                <div className="mt-[0]">
                  <LineChart hideGrid={true} data={data} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {isTransportationRequired && (
          <Transportation
            tradeAmount={parseFloat(tradeAmount) || 0}
            usage={usage}
            setTransporter={setTransporter}
          />
        )}

        <div className="flex justify-end gap-5 pt-[64px]">
          <Button name="Trade" onClick={openModal} />
          <Button
            variant="green-outlined"
            color="black"
            name="Cancel"
            onClick={() => {
              props.onTabChange("findProduct");
            }}
          />
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="">
          <Payment
            processTrade={processTrade}
            onCancel={closeModal}
            transporter={transporter}
            tradeAmount={tradeAmount}
            selectedProductDetails={props.selectedProductDetails}
            producerName={producer}
            loading={loading}
            isCustomTrade={isCustomTrade}
          />
        </div>
      </Modal>
    </div>
  );
};

const Transportation = (props: {
  tradeAmount: number;
  usage: string;
  setTransporter: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const { user } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [fleetList, setFleetList] = useState<{
    fleets: any[];
    totalCount: number;
    page: number;
    limit: number;
  }>({
    fleets: [],
    page: 1,
    limit: 5,
    totalCount: 0,
  });
  const [selectedRow, setSelectedRow] = useState<number>(-1);
  const [userTransportDetails, setUserTransportDetails] = useState({
    name: capitalizeFirstLetter(user.userName),
    registration: user.company.registration,
    street: user.company.street,
    zipCode: user.company.zipCode,
    country: user.company.country,
    city: user.company.city,
    usage: props.usage,
    phoneExtension: "+91",
    phoneNumber: "",
  });

  const getFleets = useCallback(
    async (page = 1, limit = 5) => {
      setLoading(true);
      const { status, data } = await getFleetList({
        page,
        limit,
        capacity: props.tradeAmount,
      });

      if (status && data) {
        if (data.count.count !== fleetList.totalCount) setSelectedRow(-1);

        setFleetList({
          fleets: data.fleets,
          totalCount: data.count.count,
          page,
          limit,
        });
      }
      setLoading(false);
    },
    [props.tradeAmount]
  );

  const timeout = useRef(0);
  useEffect(() => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => getFleets(), 2000);
  }, [props.tradeAmount, getFleets]);

  const fetchNext = () => {
    const { totalCount, page, limit } = fleetList;
    if (page * limit < totalCount) {
      getFleets(page + 1, limit);
    }
  };

  const fetchPrev = () => {
    const { page } = fleetList;
    if (page > 1) {
      getFleets(page - 1);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-[30px] mt-[88px]">
        <span className="font-lato font-bold text-base leading-[19.2px] text-pencilGray">
          Transportation means
        </span>

        {loading && (
          <div className="flex absolute top-0 left-0 right-0 bottom-0 bg-fadeTableGray z-50 items-center justify-center">
            <ScaleLoader color="#335908" />
          </div>
        )}

        <CustomTable
          border="b-2xl"
          headers={[
            "Ranking",
            "Name",
            "Address",
            "Rating/Review",
            "Estimated Price (USD)",
            "Select Transporter",
          ]}
          values={fleetList.fleets.map((fleet, index) => [
            index + 1,
            capitalizeFirstLetter(fleet.user.userName),
            `${fleet.company.city}, ${fleet.company.state}, ${fleet.company.country}`,
            fleet.rating,
            (fleet.perUnitPrice * props.tradeAmount).toFixed(2),
            <div
              key={fleet._id}
              className="flex gap-2 items-center justify-center"
            >
              <Checkbox
                checked={selectedRow === index}
                onSelect={() => setSelectedRow(index)}
              />
            </div>,
          ])}
          page={fleetList.page}
          totalCount={fleetList.totalCount}
          limit={fleetList.limit}
          setSelectedRow={(row) => {
            if (!row?.length) return;
            setSelectedRow(row[0] - 1);
            props.setTransporter(fleetList.fleets[row[0] - 1]);
          }}
          onClickNext={fetchNext}
          onClickPrev={fetchPrev}
        />
      </div>
      <div className="flex flex-col gap-[30px] mt-[88px]">
        <span className="font-lato font-bold text-base leading-[19.2px] text-pencilGray">
          Transportation means
        </span>
        <div className="flex items-center">
          <label className="font-lato font-semibold text-base leading-[19.2px] text-pencilGray min-w-[116px]">
            Name
          </label>
          <Input
            type="text"
            value={userTransportDetails.name}
            onChange={(e) =>
              setUserTransportDetails({
                ...userTransportDetails,
                name: e.target.value,
              })
            }
            border="shadow-dropdownBorder"
          />
        </div>
        <div className="flex items-center">
          <label className="font-lato font-semibold text-base leading-[19.2px] text-pencilGray min-w-[116px]">
            Registration
          </label>
          <Input
            type="text"
            value={userTransportDetails.registration}
            onChange={(e) =>
              setUserTransportDetails({
                ...userTransportDetails,
                registration: e.target.value,
              })
            }
            border="shadow-dropdownBorder"
          />
        </div>

        <div className="flex items-center ">
          <label className="font-lato font-semibold text-base leading-[19.2px] text-pencilGray min-w-[116px]">
            Street
          </label>
          <Input
            type="text"
            value={userTransportDetails.street}
            onChange={(e) =>
              setUserTransportDetails({
                ...userTransportDetails,
                street: e.target.value,
              })
            }
            border="shadow-dropdownBorder"
          />
        </div>

        <div className="flex gap-11">
          <div className="flex items-center flex-1 ">
            <label className="font-lato font-semibold text-base leading-[19.2px] text-pencilGray min-w-[116px]">
              Zip Code
            </label>
            <Input
              type="text"
              value={userTransportDetails.zipCode}
              onChange={(e) => {
                if (!e.target.value || isPositiveNumber(e.target.value))
                  setUserTransportDetails({
                    ...userTransportDetails,
                    zipCode: e.target.value,
                  })
              }}
              border="shadow-dropdownBorder"
            />
          </div>
          <div className="flex items-center flex-1">
            <label className="font-lato font-semibold text-base leading-[19.2px] text-pencilGray min-w-[116px]">
              City
            </label>
            <Input
              type="text"
              value={userTransportDetails.city}
              onChange={(e) =>
                setUserTransportDetails({
                  ...userTransportDetails,
                  city: e.target.value,
                })
              }
              border="shadow-dropdownBorder"
            />
          </div>
        </div>
        <div className="flex gap-11">
          <div className="flex flex-1 shadow-dropdownBorder rounded-[5px] w-fit">
            <label className="min-w-[108px] text-center flex items-center px-3 bg-sandGray">
              Phone
            </label>
            <CustomDropdown
              variant="trade"
              borderRadius="rounded-none"
              value={userTransportDetails.phoneExtension}
              onSelect={(e) =>
                setUserTransportDetails({
                  ...userTransportDetails,
                  registration: e,
                })
              }
              items={["+91", "+1", "+95"]}
              background="bg-sandGray rounded-none"
            />
            <div className="flex-1">
              <Input
                borderRadius="rounded-l-0 rounded-r-[5px]"
                type="text"
                value={userTransportDetails.phoneNumber}
                onChange={(e) => {
                  if (!e.target.value || isNonNegativeNumber(e.target.value))
                    setUserTransportDetails({
                      ...userTransportDetails,
                      phoneNumber: e.target.value,
                    })
                }
                }
                border="shadow-dropdownBorder"
              />
            </div>
          </div>
          <div className="flex-1"></div>
        </div>
        <div className="flex gap-11">
          <div className="flex flex-1 shadow-dropdownBorder rounded-[5px] w-fit">
            <label className="min-w-[108px] text-center flex items-center px-3 bg-sandGray">
              Country
            </label>
            <CustomDropdown
              variant="trade"
              width="w-full"
              value={userTransportDetails.country}
              onSelect={(e) =>
                setUserTransportDetails({
                  ...userTransportDetails,
                  country: e,
                })
              }
              items={["USA", "Germany"]}
              background="bg-sandGray"
            />
          </div>
          <div className="flex-1">
            <CustomDropdown
              variant="trade"
              width="w-full"
              value={props.usage}
              onSelect={() => { }}
              items={[]}
              background="bg-sandGray"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MakeTradeComponent;
