import * as React from "react"
import { Outlet } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"

export function Layout() {
  return (
    <div className="flex min-h-screen w-full bg-cream transition-colors duration-200">
      <Sidebar />
      <div className="flex flex-col flex-1 lg:pl-64 w-full">
        <Header />
        <main className="flex-1 p-6 lg:p-8 w-full max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
