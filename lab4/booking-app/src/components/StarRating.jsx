// src/components/StarRating.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';

function StarRating({ eventId, userId, currentRating, onRatingChange }) {
    const [rating, setRating] = useState(currentRating || 0); // Поточна оцінка користувача
    const [hover, setHover] = useState(0); // Оцінка при наведенні миші

    // В useEffect будемо завантажувати оцінку користувача для цієї події,
    // якщо вона вже існує. currentRating передається з EventCard.
    useEffect(() => {
        setRating(currentRating || 0);
    }, [currentRating]);

    const handleStarClick = async (index) => {
        if (!userId) {
            alert("Будь ласка, увійдіть, щоб оцінити подію.");
            return;
        }

        const newRating = index;
        setRating(newRating);
        onRatingChange(newRating); // Повідомляємо батьківський компонент про зміну

        try {
            const q = query(
                collection(db, 'ratings'),
                where('eventId', '==', eventId),
                where('userId', '==', userId)
            );
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                // Якщо оцінки ще немає, додаємо нову
                await addDoc(collection(db, 'ratings'), {
                    eventId: eventId,
                    userId: userId,
                    rating: newRating,
                    createdAt: new Date(),
                });
                console.log("Оцінка успішно додана!");
            } else {
                // Якщо оцінка вже є, оновлюємо її
                const ratingDoc = querySnapshot.docs[0];
                await updateDoc(doc(db, 'ratings', ratingDoc.id), {
                    rating: newRating,
                    updatedAt: new Date(),
                });
                console.log("Оцінка успішно оновлена!");
            }
        } catch (error) {
            console.error("Помилка при збереженні оцінки:", error);
            alert("Сталася помилка при збереженні оцінки. Спробуйте ще раз.");
        }
    };

    return (
        <div className="star-rating">
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className={index <= (hover || rating) ? "on" : "off"}
                        onClick={() => handleStarClick(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                        disabled={!userId} // Вимикаємо кнопки, якщо користувач не увійшов
                    >
                        <span className="star">&#9733;</span>
                    </button>
                );
            })}
        </div>
    );
}

export default StarRating;