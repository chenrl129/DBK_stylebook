import Header from "@/components/header"
import MainSection from "@/components/main-section"
import MobileSidebar from "@/components/mobile-sidebar"
import Sidebar from "@/components/sidebar"

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
        <MobileSidebar />
        <header>
          <Header />
        </header>
        <div className="flex flex-1 overflow-hidden">
            <div className="hidden overflow-auto md:flex md:w-72 md:flex-col">
                <Sidebar />
            </div>
            
            <main className="flex-1 overflow-auto p-8">
                <MainSection />
            </main>
        </div>
    </div>
  )
}
