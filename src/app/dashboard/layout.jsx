import SideNavbar from "@/components/dashboard/sideNav";

function Layout({ children }) {
  return (
    <div>
      <SideNavbar />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
