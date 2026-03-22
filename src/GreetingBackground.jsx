import { useState, useEffect } from "react";

const GREETINGS = {
  morning: [
    "Good morning",
    "Buenos días",
    "Bonjour",
    "Guten Morgen",
    "Buongiorno",
    "おはようございます",
    "좋은 아침",
    "早上好",
    "Bom dia",
    "Доброе утро",
    "Günaydın",
    "Selamat pagi",
    "God morgon",
    "Dzień dobry",
    "Καλημέρα",
  ],
  afternoon: [
    "Good afternoon",
    "Buenas tardes",
    "Bon après-midi",
    "Guten Tag",
    "Buon pomeriggio",
    "こんにちは",
    "좋은 오후",
    "下午好",
    "Boa tarde",
    "Добрый день",
    "İyi günler",
    "Selamat siang",
    "God eftermiddag",
    "Dobre popołudnie",
    "Καλό απόγευμα",
  ],
  evening: [
    "Good evening",
    "Buenas noches",
    "Bonsoir",
    "Guten Abend",
    "Buonasera",
    "こんばんは",
    "좋은 저녁",
    "晚上好",
    "Boa noite",
    "Добрый вечер",
    "İyi akşamlar",
    "Selamat malam",
    "God kväll",
    "Dobry wieczór",
    "Καλησπέρα",
  ],
};

function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  return "evening";
}

// Build rows: each row gets a shuffled slice of greetings, duplicated for seamless loop
function buildRows(greetings) {
  const rows = [
    { items: greetings.slice(0, 5), top: "8%", reverse: false, speed: 80 },
    { items: greetings.slice(5, 10), top: "30%", reverse: true, speed: 100 },
    { items: greetings.slice(10, 15), top: "55%", reverse: false, speed: 90 },
    { items: greetings.slice(2, 7), top: "78%", reverse: true, speed: 110 },
  ];
  return rows;
}

function GreetingBackground() {
  const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOfDay(getTimeOfDay());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const greetings = GREETINGS[timeOfDay];
  const rows = buildRows(greetings);

  return (
    <div className="greeting-bg" aria-hidden="true">
      {rows.map((row, ri) => (
        <div key={ri} className="greeting-row" style={{ top: row.top }}>
          <div
            className={`greeting-track${row.reverse ? " greeting-track-reverse" : ""}`}
            style={{ animationDuration: `${row.speed}s` }}
          >
            {/* Duplicate the items for seamless loop */}
            {[...row.items, ...row.items].map((text, i) => (
              <span key={i} className="greeting-item">
                {text}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default GreetingBackground;
