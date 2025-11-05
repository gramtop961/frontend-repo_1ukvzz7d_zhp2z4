import HeroSection from "./components/HeroSection";
import BookingSection from "./components/BookingSection";
import ReviewsSection from "./components/ReviewsSection";
import ChatAssistant from "./components/ChatAssistant";

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="text-xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-rose-500">TreLaDuo</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
            <a href="#book" className="hover:text-indigo-600">Prenota</a>
            <a href="#chat" className="hover:text-indigo-600">Assistente</a>
            <a href="#reviews" className="hover:text-indigo-600">Recensioni</a>
          </nav>
        </div>
      </header>

      <main>
        <HeroSection />
        <BookingSection />
        <div id="reviews"><ReviewsSection /></div>
        <ChatAssistant />
      </main>

      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-gray-600 grid md:grid-cols-2 gap-6">
          <div>
            <div className="font-semibold text-gray-800">TreLaDuo</div>
            <p className="mt-1">Duo violino e pianoforte • Eventi eleganti e personalizzati</p>
          </div>
          <div className="md:text-right">
            <p>© {new Date().getFullYear()} TreLaDuo • Tutti i diritti riservati</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
