import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
      <h2>Not Found</h2>
      <p>No vex that page wey you deh find no geh door</p>
      <Link href="/">Return Home Abeg</Link>
    </div>
  )
}