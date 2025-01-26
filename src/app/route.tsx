/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from 'next/og';

type TokenInfo = {
	iconUrl: string;
	headerUrl: string;
	name: string;
	ticker: string;
	mcap: number;
	pctChange?: number;
	volume: number;
	liquidity: number;
};

const tokenInfo: TokenInfo = {
	iconUrl: 'https://i.imgur.com/5G4U19z.png',
	headerUrl: 'https://i.imgur.com/KasaVkX.png',
	name: 'Base Season',
	ticker: 'BSE',
	pctChange: 0.05,
	mcap: 71000,
	volume: 917,
	liquidity: 32000,
};

function formatNumber(number: number) {
	const opts: Intl.NumberFormatOptions = {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 0,
		minimumFractionDigits: 0,
	};

	// if greater than 1M, use M
	if (number >= 1000000) {
		return new Intl.NumberFormat('en-US', opts).format(number / 1000000) + 'M';
	}

	// if greater than 1000, use K
	if (number >= 1000) {
		return new Intl.NumberFormat('en-US', opts).format(number / 1000) + 'K';
	}

	return new Intl.NumberFormat('en-US', opts).format(number);
}

function formatPctChange(number: number) {
	const opts: Intl.NumberFormatOptions = {
		style: 'percent',
		maximumFractionDigits: 0,
		minimumFractionDigits: 0,
	};

	if (number > 0) {
		return (
			<span style={{ color: 'green', marginLeft: 8 }}>
				+{new Intl.NumberFormat('en-US', opts).format(number)}
			</span>
		);
	}

	return (
		<span style={{ color: 'red', marginLeft: 8 }}>
			{new Intl.NumberFormat('en-US', opts).format(number)}
		</span>
	);
}

export async function GET() {
	// Simulate db call with a 1 second delay
	await new Promise((resolve) => setTimeout(resolve, 1000));

	return new ImageResponse(
		(
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
				}}>
				<div
					style={{
						display: 'flex',
						width: 1200,
						height: 400,
						backgroundImage: `url(${tokenInfo.headerUrl})`,
						backgroundSize: 'contain',
					}}>
					<img
						src={tokenInfo.headerUrl}
						alt='header'
						style={{
							width: 1200,
						}}
					/>
				</div>

				<div
					style={{
						display: 'flex',
						width: '1200',
						height: '230',
						padding: '0 70px 0 50px',
						background: 'linear-gradient(180deg, rgba(56,56,56,1) 0%, rgba(0,0,0,1) 100%)',
						justifyContent: 'space-between',
						alignItems: 'center',
						color: 'white',
					}}>
					<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
						<img
							src={tokenInfo.iconUrl}
							alt='token icon'
							style={{
								borderColor: 'black',
								borderWidth: 2,
								height: 150,
								width: 150,
								borderRadius: 999,
								marginTop: -150,
								marginBottom: 20,
							}}
						/>
						<p style={{ lineHeight: 0, fontSize: 24 }}>{tokenInfo.ticker}</p>
						<p style={{ lineHeight: 0, fontSize: 20 }}>{tokenInfo.name}</p>
					</div>

					<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
						<p style={{ lineHeight: 0, color: 'gray', fontSize: 24 }}>
							MCAP {tokenInfo.pctChange && formatPctChange(tokenInfo.pctChange)}
						</p>
						<p style={{ lineHeight: 0, fontSize: 40 }}>{formatNumber(tokenInfo.mcap)}</p>
					</div>

					<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
						<p style={{ lineHeight: 0, color: 'gray', fontSize: 24 }}>24H VOL</p>
						<p style={{ lineHeight: 0, fontSize: 40 }}>{formatNumber(tokenInfo.volume)}</p>
					</div>

					<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
						<p style={{ lineHeight: 0, color: 'gray', fontSize: 24 }}>LIQUIDITY</p>
						<p style={{ lineHeight: 0, fontSize: 40 }}>{formatNumber(tokenInfo.liquidity)}</p>
					</div>
				</div>
			</div>
		),
		{
			width: 1200,
			height: 630,
		}
	);
}
