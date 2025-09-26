"use client"

import { Suspense } from 'react';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
  <div className="w-full bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 h-screen flex justify-center items-center loading">
      Loading . . .
  </div>
)
}