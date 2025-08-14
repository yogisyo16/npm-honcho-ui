import { SvgIcon } from "@mui/material";

const Tick = () => {
	return (
		<SvgIcon style={{ width: "29px", height: "29px" }}>
			<svg
				width="36"
				height="36"
				viewBox="0 0 36 36"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect x="5" y="5" width="22" height="22" rx="11" fill="black" />
				<path
					d="M20 13L14.5 18.5L12 16"
					stroke="white"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</SvgIcon>
	);
};

export default Tick;
