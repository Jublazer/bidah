"use client"

import { Suspense } from 'react';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
  <div className="w-full h-screen flex justify-center items-center loading">
      Loading . . .
  </div>
)
}