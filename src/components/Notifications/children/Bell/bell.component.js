import React from "react";
import { Badge } from "@util-components";
import { BellIcon } from "./bell.style";

type Props = {
	unread: Boolean,
	onClick: () => void,
	active: Boolean
};

/**
 * Bell Icon to be seen in the navbar for notifications
 */
const Bell = ({ unread, onClick, active }: Props) => (
	<BellIcon className={`bell-icon ${active ? "active" : ""}`} onClick={onClick} type="button" id="notificationButton">
		<div className="icon">
			{unread > 0 && <Badge badge={unread} />}
			<img
				src="img/icon/bell.svg"
				alt="notifications"
				className="nav-icon"
				width="40px"
				height="20px"
				style={{ width: "24px" }}
			/>
		</div>
	</BellIcon>
);

export default Bell;
