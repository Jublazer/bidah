import { getServerSession } from '@/lib/auth';
import Link from 'next/link';

interface DashboardStats {
  totalOrders: number;
  activeOrders: number;
  favoriteFarmers: number;
  totalSpent: number;
}

async function getDashboardStats(): Promise<DashboardStats> {
  // Replace with your API or DB calls for buyer stats
  return {
    totalOrders: 78,
    activeOrders: 5,
    favoriteFarmers: 12,
    totalSpent: 845000,
  };
}

export default async function BuyerDashboard() {
  const session = await getServerSession();
  const stats = await getDashboardStats();

  if (!session || session.user.userType !== 'buyer') {
    return <div>Access denied. Please log in as a buyer.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-800">
            Welcome back, {session.user.profile.firstName}!
          </h1>
          <p className="text-blue-600">Manage your orders and favorite farmers</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalOrders}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Active Orders</h3>
            <p className="text-3xl font-bold text-green-600">{stats.activeOrders}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Favorite Farmers</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.favoriteFarmers}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Total Spent</h3>
            <p className="text-3xl font-bold text-orange-600">₦{stats.totalSpent.toLocaleString()}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            href="/buyer/browse-produces"
            className="bg-blue-600 text-white p-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2">Browse Produces</h3>
            <p>Explore farm produce listings from farmers</p>
          </Link>

          <Link
            href="/buyer/my-orders"
            className="bg-green-600 text-white p-6 rounded-lg shadow-md hover:bg-green-700 transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2">My Orders</h3>
            <p>Track and manage your orders</p>
          </Link>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {/* Example recent orders - replace with real data */}
            <div className="border-b pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">Order #KID20240912045</h4>
                  <p className="text-gray-600">30kg Cassava Tubers</p>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Delivered
                </span>
              </div>
            </div>

            <div className="border-b pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">Order #KID20241005099</h4>
                  <p className="text-gray-600">20kg Maize</p>
                </div>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                  Pending
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
