/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	images: { unoptimized: true },
	trailingSlash: true,
	outputFileTracingIncludes: {
		'/api/resume': ['./private/AdamHenryResume.pdf'],
	},
};

export default nextConfig;
