import { capitalizeFirstLetter } from "../utils";
import Button from "../widgets/Button";
import { AddProductIcon } from "../widgets/icons/AddProductIcon";

const CURRENCY_SYMBOL = "$ ";
const TRADE_AMOUNT_SYMBOL = " Kg";

const Payment = (props: {
  onCancel: () => void;
  processTrade: () => void;
  transporter: { perUnitPrice: string };
  tradeAmount: string;
  selectedProductDetails: Record<string, string>;
  producerName: string;
  loading: boolean;
  isCustomTrade: boolean;
}) => {
  const productPerUnitPrice = parseFloat(
    props.selectedProductDetails?.perUnitPrice || "0"
  );
  const transportPerUnitPrice = parseFloat(
    props.transporter?.perUnitPrice || "0"
  );

  const tradeAmount = parseFloat(props.tradeAmount);

  const totalProductPrice = productPerUnitPrice * tradeAmount;
  const totalTransportPrice = transportPerUnitPrice * tradeAmount;
  const totalPayablePrice = totalProductPrice + totalTransportPrice;

  return (
    <div className="rounded-[10px] overflow-hidden border-[0.5px] border-tableBorder w-[597px] relative">
      <div
        className={`flex items-center gap-2 px-5 py-[15px] bg-lightGreen w-full`}
      >
        <AddProductIcon />
        <span className="font-lato text-black text-base mr-4">
          Payment confirmation
        </span>
      </div>

      <div className="bg-white">
        <div className="px-[41px] pt-[25px] bg-white">
          <div className="flex justify-evenly gap-0">
            <span className="font-lato font-bold text-base text-start w-1/2 px-5 py-1">
              Producer name:
            </span>
            <span className="font-lato font-bold text-black text-base text-start w-1/3 px-5 py-1">
              {capitalizeFirstLetter(props.producerName)}
            </span>
          </div>
        </div>

        <div className="px-[41px] pt-[10px] bg-white">
          <div className="flex justify-evenly gap-0">
            <span className="font-lato text-black text-base text-start w-1/2 px-5 py-1">
              Product per unit price:
            </span>
            <span className="font-lato font-bold text-black text-base text-start w-1/3 px-5 py-1">
              {!props.isCustomTrade ? CURRENCY_SYMBOL + productPerUnitPrice : "Dynamic pricing"}
            </span>
          </div>
        </div>

        <div className="px-[41px] pt-[10px] bg-white">
          <div className="flex justify-evenly gap-0">
            <span className="font-lato text-black text-base text-start w-1/2 px-5 py-1">
              Trade amount:
            </span>
            <span className="font-lato font-bold text-black text-base text-start w-1/3 px-5 py-1">
              {tradeAmount.toFixed(2) + TRADE_AMOUNT_SYMBOL}
            </span>
          </div>
        </div>

        <div className="px-[41px] pt-[10px] bg-white">
          <div className="flex justify-evenly gap-0">
            <span className="font-lato text-black text-base text-start w-1/2 px-5 py-1">
              Total product price:
            </span>
            <span className="font-lato font-bold text-black text-base text-start w-1/3 px-5 py-1">
              {!props.isCustomTrade
                ? CURRENCY_SYMBOL + totalProductPrice.toFixed(2)
                : "Dynamic pricing"}
            </span>
          </div>
        </div>

        <div className="px-[41px] pt-[10px] bg-white">
          <div className="flex justify-evenly gap-0">
            <span className="font-lato text-black text-base text-start w-1/2 px-5 py-1">
              Transport per unit price:
            </span>
            <span className="font-lato font-bold text-black text-base text-start w-1/3 px-5 py-1">
              {CURRENCY_SYMBOL + transportPerUnitPrice.toFixed(2) || "NA"}
            </span>
          </div>
        </div>

        <div className="px-[41px] pt-[10px] bg-white">
          <div className="flex justify-evenly gap-0">
            <span className="font-lato text-black text-base text-start w-1/2 px-5 py-1">
              Total transport price:
            </span>
            <span className="font-lato font-bold text-black text-base text-start w-1/3 px-5 py-1">
              {CURRENCY_SYMBOL + totalTransportPrice.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="px-[41px] pt-[10px] bg-white">
          <div className="flex justify-evenly gap-0">
            <span className="font-lato font-bold text-brightGreen text-base text-start w-1/2 px-5 py-1">
              Total payable price:
            </span>
            <span className="font-lato font-bold text-black text-base text-start w-1/3 px-5 py-1">
              {!props.isCustomTrade
                ? CURRENCY_SYMBOL + totalPayablePrice.toFixed(2)
                : "Dynamic pricing"}
            </span>
          </div>
        </div>
      </div>

      <div className="px-[41px] py-[10px] bg-white">
        <div className="flex justify-center py-5 gap-5">
          <Button
            onClick={props.processTrade}
            name="Pay & Trade"
            variant="darkgreen"
            disabled={props.loading}
          />
          <Button
            onClick={() => {
              props.onCancel();
            }}
            disabled={props.loading}
            color="black"
            name="Cancel"
            variant="white"
          />
        </div>
      </div>
    </div>
  );
};

export default Payment;
