'use client';

import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from './page.module.css';
import useSWRInfinite from 'swr/infinite';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export async function fetcher<JSON = unknown>(
	input: RequestInfo,
	init?: RequestInit
) {
	const res = await fetch(input, init);

	if (!res.ok) {
		const json = (await res.json()) as { error: string };
		if (json.error) {
			const error = new Error(json.error) as Error & {
				status: number;
			};
			error.status = res.status;
			throw error;
		} else {
			throw new Error('An unexpected error occurred');
		}
	}

	return res.json() as Promise<JSON>;
}

const useQuery = () => {
	const { data, mutate, isValidating, isLoading, size, setSize } =
		useSWRInfinite(
			(index) => `http://api.localhost:3000/hello`,
			(url) => fetcher(url, { method: 'GET' })
		);

	return {
		data,
		mutate,
		isValidating,
		isLoading,
		size,
		setSize,
	};
};
const useQuery2 = () => {
	const { data, mutate, isValidating, isLoading, size, setSize } =
		useSWRInfinite(
			(index) => `http://localhost:3000/_api/hello`,
			(url) => fetcher(url, { method: 'GET' })
		);

	return {
		data,
		mutate,
		isValidating,
		isLoading,
		size,
		setSize,
	};
};

export default function Home() {
	const { data, isValidating, isLoading, setSize } = useQuery();

	// const {
	// 	data: data2,
	// 	isValidating: isValidating2,
	// 	isLoading: isLoading2,
	// 	setSize: setSize2,
	// } = useQuery2();

	console.log(data);

	return (
		<main className={styles.main}>
			<div className={styles.description}>
				<p>
					Get started by editing&nbsp;
					<code className={styles.code}>src/app/page.tsx</code>
				</p>
				<div>
					<a
						href='https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
						target='_blank'
						rel='noopener noreferrer'
					>
						By{' '}
						<Image
							src='/vercel.svg'
							alt='Vercel Logo'
							className={styles.vercelLogo}
							width={100}
							height={24}
							priority
						/>
					</a>
				</div>
			</div>

			<div className={styles.center}>
				<Image
					className={styles.logo}
					src='/next.svg'
					alt='Next.js Logo'
					width={180}
					height={37}
					priority
				/>
				<div className={styles.thirteen}>
					<Image src='/thirteen.svg' alt='13' width={40} height={31} priority />
				</div>
			</div>

			<div className={styles.grid}>
				<a
					href='https://beta.nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
					className={styles.card}
					target='_blank'
					rel='noopener noreferrer'
				>
					<h2 className={inter.className}>
						Docs <span>-&gt;</span>
					</h2>
					<p className={inter.className}>
						Find in-depth information about Next.js features and API.
					</p>
				</a>

				<a
					href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
					className={styles.card}
					target='_blank'
					rel='noopener noreferrer'
				>
					<h2 className={inter.className}>
						Templates <span>-&gt;</span>
					</h2>
					<p className={inter.className}>Explore the Next.js 13 playground.</p>
				</a>

				<a
					href='https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
					className={styles.card}
					target='_blank'
					rel='noopener noreferrer'
				>
					<h2 className={inter.className}>
						Deploy <span>-&gt;</span>
					</h2>
					<p className={inter.className}>
						Instantly deploy your Next.js site to a shareable URL with Vercel.
					</p>
				</a>
			</div>
		</main>
	);
}
