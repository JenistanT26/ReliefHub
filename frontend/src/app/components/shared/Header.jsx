import { Link } from "react-router";
import { Button } from "../ui/button";

export default function Header({ title, subtitle, setSidebarOpen, actions }) {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div >
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-600" style={{textTransform: "capitalize"}}>{subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            {actions}
            {/* Mobile Hamburger button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 bg-white rounded-md shadow-sm border border-gray-200 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
