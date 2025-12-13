// BlobBackground.jsx
import "@/app/globals.css";

const BlobBackground = () => {
	return (
		<div className="blob-container">
			{/* Blobs animati */}
			<div className="blob blob1"></div>
			<div className="blob blob2"></div>
			<div className="blob blob3"></div>

			{/* Contenuto sopra il blur */}
			<div className="content">
				<h1>Frosted Glass Effect</h1>
				<p>I blob colorati si muovono dietro uno sfondo sfocato.</p>
			</div>
		</div>
	);
};

export default BlobBackground;
