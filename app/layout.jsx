import "./globals.css";

export const metadata = {
  title: "Clipy Tools",
  description: "A simple home for Clipy creator tools."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
