import { EbayStatusCode } from "./../utils/ebayApi";
import { getItemRequest } from "../utils/api";
import { AllowedEbaySiteId } from "../utils/ebay";
import { getFeedbackMessageForRequest } from "../utils/ebayFrontend";
import { EbayItemFetchState } from "./types";

export const getItem = (itemId: string, siteId?: AllowedEbaySiteId) => async (
	dispatch,
) => {
	dispatch({
		type: EbayItemFetchState.Start,
	});
	try {
		const { item, status, message } = await getItemRequest(itemId, siteId);
		getFeedbackMessageForRequest(status, message);
		if (
			!!item &&
			Object.keys(item).length > 0 &&
			status !== EbayStatusCode.Failure
		)
			dispatch({
				type: EbayItemFetchState.Success,
				payload: { item, status, message },
			});
		else {
			dispatch({
				type: EbayItemFetchState.Failure,
				payload: { status, message },
			});
		}
	} catch (err) {
		dispatch({
			type: EbayItemFetchState.Failure,
		});
	}
};
