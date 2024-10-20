"use client";

import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          maxWidth: 1000,
        },
        duration: 5000,
      }}
    />
  );
};

export default ToastProvider;
