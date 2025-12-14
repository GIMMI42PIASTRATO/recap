import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import heicConvert from "heic-convert";

// Set your password here or use an environment variable
const MEDIA_PASSWORD = process.env.MEDIA_PASSWORD || "fpc2025";

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
		const absolutePath = path.join(process.cwd(), normalizedPath);

		// Read the file
		let fileBuffer = await readFile(absolutePath);

		// Determine MIME type
		const ext = path.extname(absolutePath).toLowerCase();
		let contentType = MIME_TYPES[ext] || "application/octet-stream";

		// Convert HEIC/HEIF to JPEG for browser compatibility
		if (ext === ".heic" || ext === ".heif") {
			try {
				const arrayBuffer = fileBuffer.buffer.slice(
					fileBuffer.byteOffset,
					fileBuffer.byteOffset + fileBuffer.byteLength
				) as ArrayBuffer;
				const convertedBuffer = await heicConvert({
					buffer: arrayBuffer,
					format: "JPEG",
					quality: 0.9,
				});
				fileBuffer = Buffer.from(convertedBuffer);
				contentType = "image/jpeg";
			} catch (convertError) {
				console.error("Error converting HEIC:", convertError);
				// Fall back to original file if conversion fails
			}
		}

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
		return NextResponse.json({ error: "File not found" }, { status: 404 });
	}
}
