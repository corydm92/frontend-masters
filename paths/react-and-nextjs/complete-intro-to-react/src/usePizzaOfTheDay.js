import { useState, useEffect, useDebugValue } from "react";

export const usePizzaOfTheDay = () => {
    const [pizzaOfTheDay, setPizzaOfTheDay] = useState(null);

    useDebugValue(
        pizzaOfTheDay
            ? `${pizzaOfTheDay.name} : ${pizzaOfTheDay.id}`
            : "Loading...",
    );

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        async function fetchPizza() {
            const response = await fetch("/api/pizza-of-the-day", { signal });
            const data = await response.json();

            setPizzaOfTheDay(data);
        }

        fetchPizza();
        return () => controller.abort();
    }, []);

    return pizzaOfTheDay;
};
