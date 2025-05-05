/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFindAllDeviceQuery } from "@/app/redux/services/device.service";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Device {
  id: string;
  brand: string;
  model: string;
  forCase: string[];
}

const DeviceList = () => {
  const { data, error, isLoading } = useFindAllDeviceQuery({});
  const [devices, setDevices] = useState<Device[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (data) {
      const devices: Device[] = data.map((item: any) => ({
        id: item.id,
        brand: item.brand,
        model: item.model,
        forCase: item.forCase,
      }));
      setDevices(devices);
    }
  }, [data]);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border rounded-lg overflow-hidden shadow-sm">
            <div className="p-4 space-y-3">
              <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                ))}
              </div>
            </div>
            <div className="p-4 border-t flex justify-end">
              <div className="h-8 bg-gray-200 rounded w-20 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-6xl mx-auto my-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
        <div className="flex items-center">
          <svg
            className="h-5 w-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <p>
            {"data" in error
              ? (error.data as { message: string }).message
              : "Failed to load devices"}
          </p>
        </div>
      </div>
    );
  }

  // Empty state
  if (devices.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-6 flex flex-col items-center justify-center space-y-4 text-center">
        <svg
          className="h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-900">No devices found</h3>
        <p className="text-sm text-gray-500">
          Add a new device to get started
        </p>
        <button
          onClick={() => router.push("/admin/device")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Device
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Device Inventory</h2>
        <button
          onClick={() => router.push("/admin/device")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Device
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map((device) => (
          <div
            key={device.id}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-800">
                  {device.brand}
                </h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  ID: {device.id.slice(0, 6)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{device.model}</p>
            </div>

            <div className="px-4 pb-4">
              <p className="text-sm font-medium text-gray-500 mb-2">Use Cases</p>
              <div className="flex flex-wrap gap-2">
                {device.forCase.map((caseType, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {caseType}
                  </span>
                ))}
              </div>
            </div>

            <div className="px-4 py-3 border-t flex justify-end">
              <button
                onClick={() => router.push(`/admin/alldevices/${device.id}`)}
                className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
              >
                <svg
                  className="w-3 h-3 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Manage
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceList;