import { useState, useEffect, useDebugValue } from "react";

export const usePizzaOfTheDay = () => {
    const [pizzaOfTheDay, setPizzaOfTheDay] = useState(null);

    useDebugValue(
        pizzaOfTheDay
            ? `${pizzaOfTheDay.name} : ${pizzaOfTheDay.id}`
            : "Loading...",
    );

    useEffect(() => {
        async function fetchPizza() {
            const response = await fetch("/api/pizza-of-the-day");
            const data = await response.json();

            setPizzaOfTheDay(data);
        }

        fetchPizza();
    }, []);

    return pizzaOfTheDay;
};
