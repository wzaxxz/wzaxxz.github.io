document.addEventListener("DOMContentLoaded", function () {
    const eventCards = document.querySelectorAll(".event-card");
    const bookingsList = document.querySelector(".bookings-list");

    eventCards.forEach(card => {
        const bookButton = card.querySelector(".book-button");
        const eventName = card.querySelector("h3").textContent;
        const eventPrice = parseInt(card.querySelector(".event-price").dataset.price);
        const quantityInput = card.querySelector(".ticket-quantity");

        bookButton.addEventListener("click", function () {
            const quantity = parseInt(quantityInput.value, 10);
            if (quantity < 1 || isNaN(quantity)) {
                alert("Виберіть коректну кількість квитків!");
                return;
            }

            const totalPrice = eventPrice * quantity;
            const bookingItem = document.createElement("li");
            bookingItem.textContent = `${eventName} - ${quantity} квитків (Сума: ${totalPrice} грн)`;
            bookingsList.appendChild(bookingItem);

            bookButton.textContent = "Заброньовано";
            bookButton.disabled = true;

            bookButton.style.transform = "scale(0.95)";
            setTimeout(() => {
                bookButton.style.transform = "scale(1)";
            }, 150);
        });
    });
});
