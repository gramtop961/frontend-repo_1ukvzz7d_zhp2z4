import { useState } from "react";
import { Star } from "lucide-react";

const initialReviews = [
  { id: 1, name: "Giulia & Marco", rating: 5, text: "Musica meravigliosa per il nostro matrimonio. Emozionante e raffinata.", date: "2025-05-12" },
  { id: 2, name: "Evento Aziendale", rating: 5, text: "Professionalità impeccabile e repertorio perfetto per l'evento.", date: "2025-04-03" },
];

export default function ReviewsSection() {
  const [reviews, setReviews] = useState(initialReviews);
  const [pending, setPending] = useState(false);
  const [form, setForm] = useState({ name: "", rating: 5, text: "" });

  const submit = async (e) => {
    e.preventDefault();
    setPending(true);
    // Simula un semplice controllo AI dei contenuti (client-side)
    await new Promise((r) => setTimeout(r, 900));
    const badWords = [/\bvolgare\b/i, /\bodio\b/i, /\bspam\b/i];
    const isClean = !badWords.some((re) => re.test(form.text));
    if (!isClean) {
      setPending(false);
      alert("La recensione contiene contenuti non appropriati. Per favore modifica il testo.");
      return;
    }
    setReviews([
      { id: Date.now(), name: form.name || "Ospite", rating: Number(form.rating), text: form.text, date: new Date().toISOString().slice(0, 10) },
      ...reviews,
    ]);
    setPending(false);
    setForm({ name: "", rating: 5, text: "" });
  };

  return (
    <section className="bg-gradient-to-b from-white to-indigo-50/40">
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Recensioni</h3>
          <p className="text-gray-600 mt-2">Esperienze reali di chi ha scelto TreLaDuo.</p>
          <div className="mt-6 space-y-4">
            {reviews.map((r) => (
              <div key={r.id} className="p-4 rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-gray-900">{r.name}</div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < r.rating ? "fill-amber-400" : "fill-none"}`} />
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-gray-700">{r.text}</p>
                <div className="mt-1 text-xs text-gray-500">{new Date(r.date).toLocaleDateString("it-IT")}</div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={submit} className="p-6 rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 self-start">
          <h3 className="text-lg font-semibold text-gray-900">Lascia una recensione</h3>
          <p className="text-sm text-gray-600 mt-1">Le recensioni vengono verificate automaticamente per garantire un tono rispettoso.</p>
          <div className="mt-4 grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm text-gray-700">Il tuo nome</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Nome (opzionale)"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Valutazione</label>
              <select
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: e.target.value })}
                className="mt-1 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>{n} stelle</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700">La tua esperienza</label>
              <textarea
                rows={4}
                required
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                className="mt-1 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Racconta com'è andata..."
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={pending}
            className={`mt-6 w-full rounded-lg text-white font-medium px-5 py-3 transition ${pending ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"}`}
          >
            {pending ? "Verifica in corso..." : "Invia recensione"}
          </button>
        </form>
      </div>
    </section>
  );
}
