import React from "react";
import { Button, message } from "antd";
import { copyToClipboard } from "../../utils/misc";
import { componentToHtml } from "../../resources/utils/templateUtils";
import Solstorm from "../../resources/templates/Solstorm";
import { EbayItem } from "../../utils/ebay";
import { BootswatchTheme } from "../../utils/themes";
import { useSelector } from "react-redux";
import { IStore } from "../../store";
import { saveCopyInDb } from "../../utils/api";

const CopyTemplateToClipboardButton = ({
	item,
	theme,
}: {
	item: EbayItem;
	theme: BootswatchTheme;
}) => {
	const { siteId } = useSelector((state: IStore) => state.editor);

	const handleCopyClick = () => {
		saveCopyInDb(item.ItemID, theme, item, siteId, item.Seller.UserID);
		copyToClipboard(componentToHtml(<Solstorm item={item} theme={theme} />));
		message.success("Copied Auction Template.");
	};

	return (
		<Button type="primary" onClick={() => handleCopyClick()}>
			Copy
		</Button>
	);
};

export default CopyTemplateToClipboardButton;
