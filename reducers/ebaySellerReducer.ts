import { EbaySellerFetchState } from "../actions/types";
import { EbayPreviewItem } from "../utils/ebay";
import { EbayStatusCode } from "../utils/ebayApi";

export interface IEbaySellerReducer {
	items?: Array<EbayPreviewItem> | null;
	status: EbayStatusCode | null;
	message: String | null;
	loading: boolean;
}

export const initialEbaySellerReducerState: IEbaySellerReducer = {
	items: null,
	status: null,
	message: null,
	loading: false,
};

const ebayItemReducer = (state = initialEbaySellerReducerState, action) => {
	const { type, payload } = action;
	switch (type) {
		case EbaySellerFetchState.Start:
			return {
				...state,
				loading: true,
			};
		case EbaySellerFetchState.Success:
			return {
				...state,
				loading: false,
				...payload,
			};
		case EbaySellerFetchState.Failure:
			return {
				...state,
				items: null,
				loading: false,
				...payload,
			};
		default:
			return state;
	}
};

export default ebayItemReducer;
