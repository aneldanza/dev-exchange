import type { CustomFlowbiteTheme } from "flowbite-react";

export const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      warning: "text-red-500 border hover:border-red-500 hover:bg-red-50",
      info: "text-blue-500 border hover:border-blue-500 hover:bg-blue-50",
    },
  },
};

export const paginationTheme = {
  base: "text-xs",
  pages: {
    previous: {
      base: "ml-0 rounded-l-md border border-appGray-300 bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-appGray-100 enabled:hover:text-appGray-700 dark:border-appGray-700 dark:bg-appGray-800 dark:text-appGray-400 enabled:dark:hover:bg-appGray-700 enabled:dark:hover:text-white",
    },
    next: {
      base: "rounded-r-md border border-appGray-300 bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-appGray-100 enabled:hover:text-appGray-700 dark:border-appGray-700 dark:bg-appGray-800 dark:text-appGray-400 enabled:dark:hover:bg-appGray-700 enabled:dark:hover:text-white",
    },
    selector: {
      base: "w-12 border border-appGray-300 bg-white py-2 leading-tight text-gray-500 enabled:hover:bg-appGray-100 enabled:hover:text-appGray-700 dark:border-appGray-700 dark:bg-appGray-800 dark:text-appGray-400 enabled:dark:hover:bg-appGray-700 enabled:dark:hover:text-white",
      active: "bg-appGray-50 text-appGray-500",
    },
  },
};
