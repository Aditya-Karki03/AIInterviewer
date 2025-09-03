import React from "react";

function getCookie(name: string): string | null {
  const value = `${document.cookie}`;

  // if the name of the token starts with token
  if (document.cookie.startsWith(name)) {
    // than send the token
    return value.split("=")[1];
  }

  return null;
}

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const token = getCookie("token");
  const isAuthenticated = Boolean(token);
  return (
    <>
      {isAuthenticated ? (
        children
      ) : (
        <div className="font-bold text-2xl text-neutral-400">
          You are not authorized to view this page
        </div>
      )}
    </>
  );
};

export default ProtectedRoutes;
