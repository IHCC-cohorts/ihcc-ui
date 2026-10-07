import React from 'react';
import { css } from 'emotion';

import GGMC_logo from './GGMC_logo.png';
import overture_logo from './overture.svg';

const footerStyle = css`
	height: 56px;
	min-height: 56px;
	max-height: 56px;
	background: white;
	border-top: solid 1px #dcdde1;
	font-size: 12px;
	padding: 0px 10px;
`;
const bodyFooter = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;
const footerSponsor = css`
	display: flex;
	flex-direction: row;
	align-items: center;
`;
const sponsorLogo = css`
	width: 100px;
`;

const Footer = () => (
	<div className={`${footerStyle} ${bodyFooter}`}>
		<div className={footerSponsor}>
			Sponsored by{' '}
			<img
				alt="GGMC_logo"
				className={sponsorLogo}
				src={GGMC_logo}
			/>
		</div>

		<div className={footerSponsor}>
			Powered by{' '}
			<a
				href="https://www.overture.bio/"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img
					alt="overture_logo"
					className={`${sponsorLogo} ${css`
						padding-left: 5px;
					`}`}
					src={overture_logo}
				/>
			</a>
		</div>

		<div>© 2018 - {new Date().getFullYear()} International Health Cohorts Consortium</div>
	</div>
);

export default Footer;
