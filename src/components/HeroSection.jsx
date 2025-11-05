import { Music, Calendar, MessageCircle } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-white">
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-indigo-700 font-medium bg-indigo-100/60 px-3 py-1 rounded-full">
            <Music className="h-4 w-4" /> TreLaDuo · Violino & Pianoforte
          </span>
          <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
            Eleganza sonora per i tuoi eventi
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Un duo giovane e raffinato che unisce violino e pianoforte per creare un’atmosfera
            intima e indimenticabile. Cerimonie, ricevimenti, eventi aziendali e privati.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#book"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-5 py-3 font-medium shadow-sm hover:bg-indigo-700 transition"
            >
              <Calendar className="h-5 w-5" /> Prenota una data
            </a>
            <a
              href="#chat"
              className="inline-flex items-center gap-2 rounded-lg bg-white text-indigo-700 px-5 py-3 font-medium shadow-sm ring-1 ring-indigo-200 hover:bg-indigo-50 transition"
            >
              <MessageCircle className="h-5 w-5" /> Chiedi all’assistente
            </a>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-6 text-sm text-gray-700">
            <div className="p-4 rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
              <dt className="font-semibold">Repertorio</dt>
              <dd className="mt-1">Classico, colonne sonore, pop elegante</dd>
            </div>
            <div className="p-4 rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
              <dt className="font-semibold">Per eventi</dt>
              <dd className="mt-1">Matrimoni, gala, vernissage, aziendali</dd>
            </div>
          </dl>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-indigo-100 via-white to-rose-50 ring-1 ring-gray-100 shadow-inner overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-7xl md:text-8xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-rose-500">
                  TreLaDuo
                </div>
                <p className="mt-2 text-gray-600">Violino • Pianoforte</p>
              </div>
            </div>
            <div className="absolute -bottom-24 -left-24 h-72 w-72 bg-indigo-200/40 blur-3xl rounded-full" />
            <div className="absolute -top-20 -right-24 h-72 w-72 bg-rose-200/40 blur-3xl rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
