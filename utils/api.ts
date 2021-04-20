import axios from "axios";
import { EbayItem, AllowedEbaySiteId, EbayPreviewItem } from "./ebay";
import { EbayStatusCode } from "./ebayApi";
import { sanitizeUriComponent } from "./misc";

const validateStatus = (status) => true;
export interface IGetItemResponse {
	item?: EbayItem;
	status: EbayStatusCode;
	message: String;
}

export const getItemRequest = async (
	itemId: string,
	siteId?: AllowedEbaySiteId,
): Promise<IGetItemResponse> => {
	const {
		data: { item, status, message },
	}: {
		data: IGetItemResponse;
	} = await axios.get(
		encodeURI(
			`api/items/${sanitizeUriComponent(itemId)}${
				!!siteId ? `?siteId=${sanitizeUriComponent(siteId)}` : ""
			}`,
		),
		{ validateStatus },
	);
	return { item, status, message };
};

export interface IGetSellerItemsResponse {
	items?: Array<EbayPreviewItem>;
	status: EbayStatusCode;
	message: String;
}

export const getSellerItemsRequest = async (
	sellerId: String,
	siteId?: AllowedEbaySiteId,
): Promise<IGetSellerItemsResponse> => {
	const {
		data: { items, status, message },
	}: {
		data: IGetSellerItemsResponse;
	} = await axios.get(
		encodeURI(
			`api/sellers/${sanitizeUriComponent(sellerId)}${
				!!siteId ? `?siteId=${sanitizeUriComponent(siteId)}` : ""
			}`,
		),
		{ validateStatus },
	);
	return { items, status, message };
};
