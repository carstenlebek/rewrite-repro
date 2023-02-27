export const dynamic = 'auto';
export const dynamicParams = false;
export const revalidate = false;
export const fetchCache = 'auto';
export const runtime = 'experimental-edge';
export const preferredRegion = 'auto';

export async function OPTIONS(request: Request) {
	return new Response('Hello, Next.js!', {
		headers: {
			'content-type': 'text/plain',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods':
				'GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH',
			'Access-Control-Allow-Headers':
				'Content-Type, Authorization, X-Requested-With, X-HTTP-Method-Override, Accept, Origin, User-Agent, DNT, Cache-Control, X-Mx-ReqToken, Keep-Alive, X-File-Name, If-Modified-Since, X-File-Size, X-Requested-With, Range',
		},
	});
}

export async function GET(request: Request) {
	return new Response('Hello, Next.js!');
}
