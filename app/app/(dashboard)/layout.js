import "../globals.css";
import Sidebar from "@/app/components/Sidebar";
import BreadCrumb from "@/app/components/Breadcrumb";


export const metadata = {
  title: "Kt3 App",
  description: "KT3 App Dashboard",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
    <body>
      <div className="flex h-screen overflow-hidden">
        <Sidebar/>
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <div className="container lg px-5">
            <BreadCrumb
              homeElement={'Home'}
              separator={<span> / </span>}
              activeClasses="breadcrumb-active"
              containerClasses="breadcrumb"
              listClasses='hover:underline mx-2 font-bold'
              capitalizeLinks
            />
            {children}
          </div>
        </div>
      </div>
    </body>
    </html>
  );
}
