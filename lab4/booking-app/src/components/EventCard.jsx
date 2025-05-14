import React, { useState } from "react";

function EventCard({ event, addBooking }) {
  const [quantity, setQuantity] = useState(1);
  const [booked, setBooked] = useState(false);

  const handleBooking = () => {
    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty < 1) {
      alert("Виберіть коректну кількість квитків!");
      return;
    }
    const totalEventPrice = event.price * qty;
    // Передаємо дані бронювання в загальний стейт через функцію addBooking
    addBooking({
      eventId: event.id,
      title: event.title,
      quantity: qty,
      total: totalEventPrice,
    });
    setBooked(true);
  };

  return (
    <div className={event.available ? "event-card" : "booked-event-card"}>
      <img src={event.image} alt={event.title} />
      <h3>{event.title}</h3>
      <p className="event-date">
        Дата:{" "}
        {new Date(event.date).toLocaleDateString("uk-UA", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      <p>Місце: {event.location}</p>
      <p className="event-price">Ціна: {event.price} грн</p>
      {event.available ? (
        <>
          <label>
            Кількість квитків:
            <input
              type="number"
              className="ticket-quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>
          <button
            className="book-button"
            onClick={handleBooking}
            disabled={booked}
          >
            {booked ? "Заброньовано" : "Забронювати"}
          </button>
        </>
      ) : (
        <button className="book-button" disabled>
          Відбулась
        </button>
      )}
    </div>
  );
}

export default EventCard;
