import { NextRequest, NextResponse } from "next/server";
import { readFile, access } from "fs/promises";
import path from "path";
import sharp from "sharp";

// Set your password here or use an environment variable
const MEDIA_PASSWORD = process.env.MEDIA_PASSWORD || "fpc2025";

// Image optimization settings - optimized for mobile performance
const IMAGE_MAX_WIDTH = 1280; // Max width for images (reduced for mobile)
const IMAGE_MAX_HEIGHT = 720; // Max height for images (reduced for mobile)
const IMAGE_QUALITY = 65; // Quality for WebP (0-100) - lower = smaller file size

// Extensions that can be optimized with sharp
const OPTIMIZABLE_IMAGES = [".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif"];

// Image extensions to try when file not found (in order of preference)
const IMAGE_EXTENSIONS = [
	".png",
	".jpg",
	".jpeg",
	".webp",
	".gif",
	".svg",
	".heic",
	".heif",
];

// MIME types for common media files
const MIME_TYPES: Record<string, string> = {
	// Images
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".png": "image/png",
	".gif": "image/gif",
	".webp": "image/webp",
	".svg": "image/svg+xml",
	".ico": "image/x-icon",
	".heic": "image/heic",
	".heif": "image/heif",
	// Audio
	".mp3": "audio/mpeg",
	".wav": "audio/wav",
	".ogg": "audio/ogg",
	".m4a": "audio/mp4",
	".aac": "audio/aac",
	// Video
	".mp4": "video/mp4",
	".webm": "video/webm",
	".mov": "video/quicktime",
};

/**
 * Optimize an image using sharp
 * Resizes if too large and compresses to WebP format for better performance
 */
async function optimizeImage(
	buffer: Buffer
): Promise<{ data: Buffer; contentType: string }> {
	let sharpInstance = sharp(buffer, { failOnError: false });

	// Get image metadata
	const metadata = await sharpInstance.metadata();

	// Auto-rotate based on EXIF orientation data (fixes rotated phone photos)
	sharpInstance = sharpInstance.rotate();

	// Always resize to fit within max dimensions for consistent mobile performance
	sharpInstance = sharpInstance.resize(IMAGE_MAX_WIDTH, IMAGE_MAX_HEIGHT, {
		fit: "inside", // Maintain aspect ratio, fit within bounds
		withoutEnlargement: true, // Don't upscale smaller images
	});

	// Convert to WebP with aggressive compression settings
	const optimizedBuffer = await sharpInstance
		.webp({
			quality: IMAGE_QUALITY,
			effort: 6, // Higher effort = better compression (0-6)
			smartSubsample: true, // Better color subsampling
			nearLossless: false, // Use lossy for smaller files
		})
		.toBuffer();
	return { data: optimizedBuffer, contentType: "image/webp" };
}

/**
 * Try to find a file, attempting different image extensions if not found
 */
async function findFile(basePath: string): Promise<string | null> {
	// First, try the exact path
	try {
		await access(basePath);
		return basePath;
	} catch {
		// File doesn't exist at exact path
	}

	// Check if it already has an extension
	const ext = path.extname(basePath).toLowerCase();
	if (ext && ext.length > 1) {
		// Has extension but file not found
		return null;
	}

	// Try different image extensions
	for (const imageExt of IMAGE_EXTENSIONS) {
		const pathWithExt = basePath + imageExt;
		try {
			await access(pathWithExt);
			return pathWithExt;
		} catch {
			// Continue trying other extensions
		}
	}

	return null;
}

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const password = searchParams.get("key");
	const filePath = searchParams.get("path");

	// Validate password
	if (!password || password !== MEDIA_PASSWORD) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	// Validate file path
	if (!filePath) {
		return NextResponse.json(
			{ error: "Missing file path" },
			{ status: 400 }
		);
	}

	// Security: Prevent directory traversal attacks
	const normalizedPath = path
		.normalize(filePath)
		.replace(/^(\.\.(\/|\\|$))+/, "");

	// Only allow files from the media folder
	if (
		!normalizedPath.startsWith("media/") &&
		!normalizedPath.startsWith("media\\")
	) {
		return NextResponse.json({ error: "Access denied" }, { status: 403 });
	}

	try {
		// Construct the absolute path to the media file
		const baseAbsolutePath = path.join(process.cwd(), normalizedPath);

		// Find the actual file (try different extensions if needed)
		const absolutePath = await findFile(baseAbsolutePath);

		if (!absolutePath) {
			console.error("File not found:", baseAbsolutePath);
			return NextResponse.json(
				{ error: "File not found" },
				{ status: 404 }
			);
		}

		console.log("Found file:", absolutePath);

		// Read the file
		const fileBuffer = await readFile(absolutePath);
		console.log("File read successfully, size:", fileBuffer.length);

		// Determine file extension
		const ext = path.extname(absolutePath).toLowerCase();

		// Check if this is an optimizable image
		if (OPTIMIZABLE_IMAGES.includes(ext)) {
			try {
				console.log("Optimizing image with extension:", ext);
				const { data, contentType } = await optimizeImage(fileBuffer);
				console.log(
					"Image optimized successfully, new size:",
					data.length
				);
				return new NextResponse(new Uint8Array(data), {
					status: 200,
					headers: {
						"Content-Type": contentType,
						"Cache-Control": "private, max-age=86400", // Cache for 24 hours
					},
				});
			} catch (optimizeError) {
				console.error(
					"Error optimizing image, serving original:",
					optimizeError
				);
				// Fall through to serve original file
			}
		}

		// Serve original file (for non-images, GIFs, SVGs, or if optimization failed)
		const contentType = MIME_TYPES[ext] || "application/octet-stream";

		// Return the file with appropriate headers
		return new NextResponse(fileBuffer, {
			status: 200,
			headers: {
				"Content-Type": contentType,
				"Cache-Control": "private, max-age=3600",
			},
		});
	} catch (error) {
		console.error("Error serving media file:", error);
		console.error("Requested path:", filePath);
		console.error("Normalized path:", normalizedPath);
		return NextResponse.json({ error: "File not found" }, { status: 404 });
	}
}
