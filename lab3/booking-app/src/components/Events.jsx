import React, { useState } from "react";
import EventCard from "./EventCard";
import event1 from "./event1.jpg";
import event2 from "./event2.jpg";
import event3 from "./event3.jpg";
import event4 from "./event4.jpg";
import event5 from "./event5.jpg";
import event6 from "./event6.jpg";

const initialEvents = [
  {
    id: 1,
    title: 'Концерт "Rock Night"',
    date: "2025-04-15",
    location: "Київ, Палац Спорту",
    price: 1500,
    image: event1,
    type: "концерт",
    available: true,
  },
  {
    id: 2,
    title: "Ярмарок сиру та вина",
    date: "2025-04-20",
    location: "Львів, Палац Потоцьких",
    price: 300,
    image: event2,
    type: "ярмарок",
    available: true,
  },
  {
    id: 3,
    title: "Весняний стендап",
    date: "2025-05-06",
    location: "Одеса, Будинок Клоунів",
    price: 750,
    image: event3,
    type: "стендап",
    available: true,
  },
  {
    id: 4,
    title: "Кіно під відкритим небом",
    date: "2025-06-28",
    location: "Львів, Стрийський Парк",
    price: 150,
    image: event4,
    type: "кіно",
    available: true,
  },
  {
    id: 5,
    title: "Концерт Океан Ельзи",
    date: "2025-01-12",
    location: "Львів, Palladium",
    price: 900,
    image: event5,
    type: "концерт",
    available: false,
  },
  {
    id: 6,
    title: "Сірано Де Бержерак",
    date: "2025-02-18",
    location: "Львів, Національний драматичний театр",
    price: 650,
    image: event6,
    type: "театр",
    available: false, 
  },
];

function Events({ addBooking }) {
  const [filterType, setFilterType] = useState("all");
  const [sortOption, setSortOption] = useState("dateDesc");

  const filteredEvents = initialEvents
    .filter((event) => filterType === "all" || event.type === filterType)
    .sort((a, b) => {
      if (sortOption === "dateDesc") return new Date(b.date) - new Date(a.date);
      if (sortOption === "dateAsc") return new Date(a.date) - new Date(b.date);
      return 0;
    });

  return (
    <main>
      <section id="events">
        <h2>Майбутні події</h2>
        <div className="filters">
          <label>
            Фільтр за типом:
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">Всі</option>
              <option value="концерт">Концерт</option>
              <option value="ярмарок">Ярмарок</option>
              <option value="стендап">Стендап</option>
              <option value="кіно">Кіно</option>
              <option value="театр">Театр</option>
            </select>
          </label>
          <label>
            Сортування:
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="dateDesc">За спаданням дати</option>
              <option value="dateAsc">За зростанням дати</option>
            </select>
          </label>
        </div>
        <div className="events-grid">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} addBooking={addBooking} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Events;
