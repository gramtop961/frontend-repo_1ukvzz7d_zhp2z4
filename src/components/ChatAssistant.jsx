import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send } from "lucide-react";

function replyFor(input) {
  const text = input.toLowerCase();
  // Regole molto semplici lato client per una sensazione "AI" calma
  if (/(ciao|buongiorno|salve)/.test(text)) return "Ciao, sono l’assistente di TreLaDuo. Dimmi pure come posso aiutarti.";
  if (/prezzo|preventivo|costi/.test(text)) return "I nostri preventivi dipendono da data, luogo e durata. Indica quando e dove si terrà l’evento e preparerò una stima.";
  if (/disponibil|calendar/.test(text)) return "Puoi controllare subito le disponibilità selezionando una data dal calendario e inviando la richiesta.";
  if (/repertorio|brani|musica/.test(text)) return "Suoniamo classica, colonne sonore e pop elegante. Hai un brano speciale in mente?";
  if (/contatto|telefono|chiamata/.test(text)) return "Possiamo sentirci al telefono o via email, come preferisci. Lasciami un recapito e una fascia oraria comoda per te.";
  return "Grazie per il messaggio. Raccontami data, città e tipo di evento: ti guiderò passo passo.";
}

export default function ChatAssistant() {
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { id: 0, role: "assistant", text: "Ciao! Sono l’assistente calmo e rilassato di TreLaDuo. Posso aiutarti con disponibilità, preventivi e repertorio." },
  ]);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  const send = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setMessages((m) => [...m, { id: Date.now(), role: "user", text: userText }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { id: Date.now() + 1, role: "assistant", text: replyFor(userText) }]);
    }, 500);
  };

  return (
    <section id="chat" className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-[1fr_380px] gap-10 items-start">
        <div className="p-6 rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-indigo-600" /> Assistente TreLaDuo
          </h3>
          <p className="mt-2 text-gray-600">
            Fai domande su disponibilità, repertorio, costi e organizzazione. L’assistente risponde con un tono tranquillo e chiaro.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 overflow-hidden flex flex-col h-[420px]">
          <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-white to-indigo-50/30">
            {messages.map((m) => (
              <div key={m.id} className={`max-w-[85%] px-4 py-2 rounded-2xl ${m.role === "assistant" ? "bg-indigo-600 text-white ml-0" : "bg-gray-100 text-gray-800 ml-auto"}`}>
                {m.text}
              </div>
            ))}
          </div>
          <div className="p-3 border-t bg-white flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Scrivi un messaggio..."
              className="flex-1 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
            <button onClick={send} className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 font-medium hover:bg-indigo-700 transition">
              <Send className="h-4 w-4" /> Invia
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
