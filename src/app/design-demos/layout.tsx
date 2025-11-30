/**
 * Design Demos Layout
 * 
 * Standalone layout for design demo pages to showcase different design approaches
 * without interference from the main site layout
 */

export default function DesignDemosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Allow demos to render with their own styling */}
      {children}
    </>
  );
}

