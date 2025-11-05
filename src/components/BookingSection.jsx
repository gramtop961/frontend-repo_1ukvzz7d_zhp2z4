import { useMemo, useState } from "react";
import { Calendar as CalendarIcon, Phone } from "lucide-react";

function buildMonth(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days = [];
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const d = new Date(year, month, i);
    days.push({
      date: d,
      key: `${year}-${month + 1}-${i}`,
      weekday: d.getDay(),
    });
  }
  return { firstDay, lastDay, days };
}

const busySample = [
  // ISO strings representing unavailable dates for demo
  // Customize as needed
  new Date().toDateString(),
  new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toDateString(),
  new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toDateString(),
];

export default function BookingSection() {
  const today = new Date();
  const [{ month, year }, setView] = useState({ month: today.getMonth(), year: today.getFullYear() });
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", location: "", message: "", contact: "email" });
  const { days, firstDay, lastDay } = useMemo(() => buildMonth(year, month), [year, month]);

  const monthName = new Intl.DateTimeFormat("it-IT", { month: "long", year: "numeric" }).format(firstDay);

  const isBusy = (d) => busySample.includes(d.toDateString());
  const isPast = (d) => d < new Date(new Date().setHours(0, 0, 0, 0));

  const onSubmit = (e) => {
    e.preventDefault();
    alert(
      `Richiesta inviata!\n\nNome: ${form.name}\nEmail: ${form.email}\nTelefono: ${form.phone}\nData: ${selected ? selected.toDateString() : "—"}\nLuogo: ${form.location}\nContatto: ${form.contact}\n\nTi risponderemo al più presto.`
    );
  };

  return (
    <section id="book" className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="p-6 rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-indigo-600" /> Calendario disponibilità
            </h3>
            <div className="flex items-center gap-2">
              <button
                className="px-2 py-1 rounded-md text-sm ring-1 ring-gray-200 hover:bg-gray-50"
                onClick={() => setView((v) => ({
                  month: v.month === 0 ? 11 : v.month - 1,
                  year: v.month === 0 ? v.year - 1 : v.year,
                }))}
                aria-label="Mese precedente"
              >
                ‹
              </button>
              <div className="text-sm font-medium text-gray-700 w-40 text-center capitalize">{monthName}</div>
              <button
                className="px-2 py-1 rounded-md text-sm ring-1 ring-gray-200 hover:bg-gray-50"
                onClick={() => setView((v) => ({
                  month: v.month === 11 ? 0 : v.month + 1,
                  year: v.month === 11 ? v.year + 1 : v.year,
                }))}
                aria-label="Mese successivo"
              >
                ›
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-7 text-center text-xs text-gray-500">
            {["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"].map((w) => (
              <div key={w} className="py-1">{w}</div>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {Array.from({ length: ((firstDay.getDay() + 6) % 7) }, (_, i) => (
              <div key={`pad-${i}`} />
            ))}
            {days.map((d) => {
              const disabled = isPast(d.date) || isBusy(d.date);
              const isSelected = selected && d.date.toDateString() === selected.toDateString();
              return (
                <button
                  key={d.key}
                  onClick={() => !disabled && setSelected(d.date)}
                  className={`aspect-square rounded-lg text-sm flex items-center justify-center border transition 
                    ${disabled ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-indigo-50 border-gray-200"}
                    ${isSelected ? "!bg-indigo-600 !text-white !border-indigo-600" : ""}
                  `}
                  aria-disabled={disabled}
                >
                  {d.date.getDate()}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-gray-500">
            Le date in grigio non sono disponibili. Seleziona una data libera e compila il modulo per richiedere un preventivo.
          </p>
        </div>

        <form onSubmit={onSubmit} className="p-6 rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Richiedi disponibilità e preventivo</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700">Nome e cognome</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Mario Rossi"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="mario@email.com"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Telefono</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="mt-1 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="+39 ..."
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Data evento</label>
              <input
                type="date"
                value={selected ? new Date(selected.getTime() - selected.getTimezoneOffset() * 60000).toISOString().slice(0, 10) : ""}
                onChange={(e) => {
                  const d = e.target.value ? new Date(e.target.value) : null;
                  setSelected(d);
                }}
                className="mt-1 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700">Luogo</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="mt-1 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Città, venue o indirizzo"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700">Messaggio</label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-1 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Dettagli dell'evento, orari, richieste musicali..."
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700 mb-1">Preferenza di contatto</label>
              <div className="flex gap-3">
                {[
                  { id: "email", label: "Email" },
                  { id: "phone", label: "Telefono" },
                ].map((opt) => (
                  <label key={opt.id} className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition ${form.contact === opt.id ? "bg-indigo-50 border-indigo-300 text-indigo-700" : "bg-white border-gray-200 text-gray-700"}`}>
                    <input
                      type="radio"
                      name="contact"
                      checked={form.contact === opt.id}
                      onChange={() => setForm({ ...form, contact: opt.id })}
                      className="hidden"
                    />
                    {opt.id === "phone" ? <Phone className="h-4 w-4" /> : null}
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-3 transition"
          >
            Invia richiesta
          </button>
          <p className="mt-3 text-xs text-gray-500">
            Nessun pagamento ora. Ti risponderemo con disponibilità, repertorio e preventivo.
          </p>
        </form>
      </div>
    </section>
  );
}
