export default function AdminSidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">  
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        <ul>
            <li className="mb-2"><a href="/admin/dashboard" className="hover:text-gray-400">Dashboard</a></li>
            <li className="mb-2"><a href="/admin/jobs" className="hover:text-gray-400">Manage Jobs</a></li>
            <li className="mb-2"><a href="/admin/users" className="hover:text-gray-400">Manage Users</a></li>
            <li className="mb-2"><a href="/admin/applications" className="hover:text-gray-400">Manage Applications</a></li>
        </ul>
    </div>
  );
}