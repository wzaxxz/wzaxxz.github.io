import React from "react";

function Bookings({ bookings }) {
  const totalTickets = bookings.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = bookings.reduce((sum, item) => sum + item.total, 0);

  return (
    <main>
      <section id="bookings">
        <h2>Мої бронювання</h2>
        <ul className="bookings-list">
          {bookings.map((item, index) => (
            <li key={index}>
              {item.title} - {item.quantity} квитків (Сума: {item.total} грн)
            </li>
          ))}
        </ul>
        <div className="summary">
          <p>
            <strong>Загальна кількість квитків:</strong>{" "}
            <span id="total-tickets">{totalTickets}</span>
          </p>
          <p>
            <strong>Загальна сума бронювань:</strong>{" "}
            <span id="total-price">{totalPrice}</span> грн
          </p>
        </div>
      </section>
    </main>
  );
}

export default Bookings;
