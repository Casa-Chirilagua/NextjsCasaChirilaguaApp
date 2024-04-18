import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        includePath: [join(__dirname, "styles")],
    },
    images: {
        unoptimized: true,
        domains: ["res.cloudinary.com"],
    },
};

export default nextConfig;
