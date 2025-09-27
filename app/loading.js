"use client"

import { Suspense } from 'react';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
  <div className="w-full bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 h-screen flex justify-center items-center loading">
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-15 w-15 border-b-2 border-green-500 mr-2 text-green-500">B</div>
        {/* Abeg no vex . . . */}
      </div>
  </div>
)
}