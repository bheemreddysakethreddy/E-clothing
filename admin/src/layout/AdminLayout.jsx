import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const token = !!localStorage.getItem("token");
  const Navigate = useNavigate();

  function HandleAdminLogin() {
    const ok = confirm("are you sure, to logout?");
    if (!ok) return;
    localStorage.clear("token");
    localStorage.clear("user");
    Navigate("/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

        <nav className="space-y-4">
          <Link
            to="/products"
            className="block px-3 py-2 rounded hover:bg-gray-800"
          >
            My Products
          </Link>

          <Link
            to="/products/add"
            className="block px-3 py-2 rounded hover:bg-gray-800"
          >
            Add Product
          </Link>
          <button
            onClick={() => HandleAdminLogin()}
            className="rounded-2xl px-2 py-1 border-2"
          >
            {token ? "logout" : "login"}
          </button>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
