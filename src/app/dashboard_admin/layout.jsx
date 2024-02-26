import AdminNavbar from "@/components/dashboard/adminNav";

function Layout({ children }) {
  return (
    <div>
      <AdminNavbar />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
