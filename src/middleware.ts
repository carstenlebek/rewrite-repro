import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import cors from '@/utils/cors';

export default function handler(req: NextRequest) {
	const url = req.nextUrl;

	// Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
	const hostname = req.headers.get('host') || '';

	// Get the pathname of the request (e.g. /, /about, /blog/first-post)
	const path = url.pathname;

	/*  You have to replace ".vercel.pub" with your own domain if you deploy this example under your domain.
      You can also use wildcard subdomains on .vercel.app links that are associated with your Vercel team slug
      in this case, our team slug is "platformize", thus *.platformize.vercel.app works. Do note that you'll
      still need to add "*.platformize.vercel.app" as a wildcard domain on your Vercel dashboard. */

	const currentHost =
		process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
			? hostname.replace(``, '')
			: // .replace(`.platformize.vercel.app`, "")
			  hostname.replace(`.localhost:3000`, '');

	// if (isPublic(req.nextUrl.pathname)) {
	//   return NextResponse.next();
	// }

	console.log('currentHost', currentHost);
	console.log('path', path);

	// rewrites for api
	if (currentHost === 'api') {
		url.pathname = `/_api${url.pathname}`;
		// return NextResponse.rewrite(url);
		return cors(req, NextResponse.rewrite(url), {
			methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH'],
			origin: '*',
		});
	}

	// rewrites for app pages
	if (currentHost == 'app') {
		url.pathname = `/app${url.pathname}`;
		return NextResponse.rewrite(url, req);
	}

	// rewrite root application to `/home` folder
	if (hostname === 'localhost:3000' || hostname === 'meinung.app') {
        console.log('Home rewrite', path);
        if (path.includes('_api')) {
            return NextResponse.next();
        }
		return NextResponse.rewrite(new URL(`/home${path}`, req.url));
	}

	// rewrite everything else to `/portal/[site] dynamic route
	return NextResponse.rewrite(
		new URL(`/_portal/${currentHost}${path}`, req.url)
	);
}

export const config = {
	matcher: '/((?!_next/image|_next/static|favicon.ico).*)',
};
