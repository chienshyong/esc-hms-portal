import Navbar from "@/components/tenant/navbar"

export default function TenantLayout({
    children, 
  }) {
    return (
    <div className="grid lg:grid-cols-[220px,1fr] grid-cols-[auto,1fr] min-h-screen">
        <Navbar></Navbar>
        <main className="px-4">
          {children}
        </main>
      </div>
    )
  }