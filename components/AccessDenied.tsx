"use client";

// import { useMedia } from "@/contexts/MediaContext";

export default function AccessDenied() {
	// const { isAuthorized } = useMedia();

	// If somehow authorized, don't show this
	// if (isAuthorized) return null;

	return (
		<div
			style={{
				minHeight: "100dvh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				background:
					"linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
				padding: "2rem",
				textAlign: "center",
			}}
		>
			{/* Animated gradient background */}
			<div
				style={{
					position: "absolute",
					inset: 0,
					opacity: 0.4,
					background:
						"linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
					backgroundSize: "400% 400%",
					animation: "gradientShift 15s ease infinite",
					zIndex: 0,
				}}
			/>

			{/* Noise texture */}
			<div
				style={{
					position: "absolute",
					inset: 0,
					opacity: 0.03,
					pointerEvents: "none",
					backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
					zIndex: 1,
				}}
			/>

			{/* Content */}
			<div
				style={{
					position: "relative",
					zIndex: 10,
					maxWidth: "500px",
				}}
			>
				{/* Lock icon */}
				<div
					style={{
						fontSize: "5rem",
						marginBottom: "1.5rem",
						animation: "pulse 2s ease-in-out infinite",
					}}
				>
					🔒
				</div>

				{/* Title */}
				<h1
					style={{
						fontSize: "clamp(2rem, 6vw, 3rem)",
						fontWeight: 900,
						color: "white",
						marginBottom: "1rem",
						background:
							"linear-gradient(135deg, #fff 0%, #e0e0e0 50%, #c0c0c0 100%)",
						WebkitBackgroundClip: "text",
						WebkitTextFillColor: "transparent",
						backgroundClip: "text",
					}}
				>
					Accesso Richiesto
				</h1>

				{/* Description */}
				<p
					style={{
						fontSize: "clamp(1rem, 3vw, 1.25rem)",
						color: "rgba(255, 255, 255, 0.8)",
						lineHeight: 1.6,
						marginBottom: "2rem",
					}}
				>
					Per visualizzare il tuo FPC Wrapped 2025, hai bisogno di un
					link di accesso speciale.
				</p>

				{/* Requirements box */}
				<div
					style={{
						background: "rgba(255, 255, 255, 0.08)",
						backdropFilter: "blur(20px)",
						borderRadius: "20px",
						padding: "1.5rem",
						border: "1px solid rgba(255, 255, 255, 0.15)",
						marginBottom: "2rem",
					}}
				>
					<h2
						style={{
							fontSize: "1rem",
							fontWeight: 700,
							color: "white",
							marginBottom: "1rem",
							textTransform: "uppercase",
							letterSpacing: "0.1em",
						}}
					>
						Come accedere
					</h2>
					<ul
						style={{
							listStyle: "none",
							padding: 0,
							margin: 0,
							textAlign: "left",
						}}
					>
						<li
							style={{
								display: "flex",
								alignItems: "center",
								gap: "0.75rem",
								color: "rgba(255, 255, 255, 0.9)",
								marginBottom: "0.75rem",
							}}
						>
							<span style={{ fontSize: "1.2rem" }}>📧</span>
							<span>Richiedi il link al gruppo FPC</span>
						</li>
						<li
							style={{
								display: "flex",
								alignItems: "center",
								gap: "0.75rem",
								color: "rgba(255, 255, 255, 0.9)",
								marginBottom: "0.75rem",
							}}
						>
							<span style={{ fontSize: "1.2rem" }}>🔗</span>
							<span>Usa il link con la chiave di accesso</span>
						</li>
						<li
							style={{
								display: "flex",
								alignItems: "center",
								gap: "0.75rem",
								color: "rgba(255, 255, 255, 0.9)",
							}}
						>
							<span style={{ fontSize: "1.2rem" }}>🎉</span>
							<span>Goditi il tuo Wrapped!</span>
						</li>
					</ul>
				</div>

				{/* URL format hint */}
				<p
					style={{
						fontSize: "0.85rem",
						color: "rgba(255, 255, 255, 0.5)",
						fontFamily: "monospace",
					}}
				>
					URL: esempio.com
					<span style={{ color: "rgba(255, 255, 255, 0.8)" }}>
						?key=tuachiave
					</span>
				</p>
			</div>

			{/* CSS Animation */}
			<style jsx>{`
				@keyframes gradientShift {
					0% {
						background-position: 0% 50%;
					}
					50% {
						background-position: 100% 50%;
					}
					100% {
						background-position: 0% 50%;
					}
				}
				@keyframes pulse {
					0%,
					100% {
						transform: scale(1);
					}
					50% {
						transform: scale(1.1);
					}
				}
			`}</style>
		</div>
	);
}
