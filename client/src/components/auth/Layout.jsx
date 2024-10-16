import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full ">
      <div className="hidden lg:flex items-center justify-center pr-2 bg-gray-900 dark:bg-blue-900/15 ">
        <div className=" max-w-md space-y-6 text-center text-primary-foreground ">
          <h1 className="text-4xl font-extrabold tracking-tight pl-2 text-white ">
            Welcome to Shoppy Site.
          </h1>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-white dark:bg-gray-900 dark:text-white px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}
