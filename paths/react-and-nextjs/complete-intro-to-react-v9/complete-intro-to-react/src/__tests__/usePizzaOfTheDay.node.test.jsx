import { expect, test, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import createFetchMock from "vitest-fetch-mock";
import { usePizzaOfTheDay } from "../usePizzaOfTheDay";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const testPizza = {
    id: "calabrese",
    name: "The Calabrese Pizza",
    category: "Supreme",
    description: "lol pizza",
    image: "/public/pizzas/calabrese.webp",
    sizes: { S: 12, M: 16, L: 20 },
};

test("gives null when first called", async () => {
    fetch.mockResponseOnce(JSON.stringify(testPizza));

    const { result } = renderHook(() => usePizzaOfTheDay());

    expect(result.current).toBeNull();
});

test("to call api and return pizza", async () => {
    fetch.mockResponseOnce(JSON.stringify(testPizza));
    const { result } = renderHook(() => usePizzaOfTheDay());

    await waitFor(() => {
        expect(result.current).toEqual(testPizza);
    });

    expect(fetchMocker).toBeCalledWith(
        "/api/pizza-of-the-day",
        expect.any(Object),
    );
});
