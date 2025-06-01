// src/components/EventCard.jsx
import React, { useState, useEffect } from "react"; // Додаємо useEffect
import { db, auth } from "../firebaseConfig";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore"; // Додаємо query, where, getDocs
import StarRating from "./StarRating"; // Імпортуємо StarRating

function EventCard({ event }) {
  const [quantity, setQuantity] = useState(1);
  const [booked, setBooked] = useState(false);
  const [userRating, setUserRating] = useState(0); // Стан для зберігання оцінки користувача
  const [averageRating, setAverageRating] = useState(0); // Стан для середньої оцінки
  const [numberOfRatings, setNumberOfRatings] = useState(0); // Кількість оцінок

  const user = auth.currentUser; // Отримуємо поточного користувача

  // Завантаження оцінки користувача та середньої оцінки при завантаженні компонента
  useEffect(() => {
    const fetchRatings = async () => {
      // Завантажити оцінку поточного користувача
      if (user) {
        const qUserRating = query(
          collection(db, 'ratings'),
          where('eventId', '==', event.id),
          where('userId', '==', user.uid)
        );
        const userRatingSnapshot = await getDocs(qUserRating);
        if (!userRatingSnapshot.empty) {
          setUserRating(userRatingSnapshot.docs[0].data().rating);
        } else {
          setUserRating(0); // Якщо користувач ще не оцінював
        }
      }

      // Розрахувати та завантажити середню оцінку для події
      const qAllRatings = query(
        collection(db, 'ratings'),
        where('eventId', '==', event.id)
      );
      const allRatingsSnapshot = await getDocs(qAllRatings);
      let totalRating = 0;
      let count = 0;
      allRatingsSnapshot.forEach(doc => {
        totalRating += doc.data().rating;
        count++;
      });

      if (count > 0) {
        setAverageRating(totalRating / count);
        setNumberOfRatings(count);
      } else {
        setAverageRating(0);
        setNumberOfRatings(0);
      }
    };

    fetchRatings();
  }, [event.id, user, userRating]); // Додаємо userRating в залежності, щоб оновлювати середню оцінку після зміни користувачем

  const handleBooking = async () => {
    const qty = parseInt(quantity, 10);

    if (isNaN(qty) || qty < 1) {
      alert("Виберіть коректну кількість квитків!");
      return;
    }

    if (!user) {
      alert("Увійдіть у свій акаунт, щоб зробити бронювання.");
      return;
    }

    const totalEventPrice = Number(event.price) * qty;

    const newBooking = {
      eventId: event.id,
      title: event.title,
      quantity: qty,
      total: totalEventPrice,
      userId: user.uid,
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(db, "bookings"), newBooking);
      setBooked(true);
      alert("Бронювання успішно створене!");
    } catch (error) {
      console.error("Помилка при створенні бронювання:", error);
      alert("Сталася помилка при створенні бронювання. Спробуйте ще раз.");
    }
  };

  const handleRatingChange = (newRating) => {
    setUserRating(newRating); // Оновлюємо локальний стан оцінки користувача
    // Середня оцінка буде оновлена через useEffect, коли userRating зміниться
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

      {/* Відображення середньої оцінки */}
      {averageRating > 0 && (
        <p>Середня оцінка: {averageRating.toFixed(1)} ({numberOfRatings} оцінок)</p>
      )}

      {/* Компонент StarRating */}
      {user && ( // Показуємо StarRating тільки якщо користувач автентифікований
        <StarRating
          eventId={event.id}
          userId={user.uid}
          currentRating={userRating}
          onRatingChange={handleRatingChange}
        />
      )}

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