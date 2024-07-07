import { act, renderHook, waitFor } from "@testing-library/react";
import axios from "axios";
import useApi from "./useApi";

jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: "mocked data" })),
}));

describe("useApi", () => {
  it("fetches data on mount", async () => {
    const { result } = renderHook(() =>
      useApi<string>("https://restcountries.com/v3.1/all")
    );
    await act(async () => {
      await waitFor(() => result.current.data !== null);
    });
    expect(result.current).toEqual({ data: "mocked data", error: null });
  });

  it("handles errors", async () => {
    (axios.get as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error("Network error"))
    );
    const { result } = renderHook(() =>
      useApi<string>("https://restcountries.com/v3.1/name/error")
    );
    await act(async () => {
      await waitFor(() => result.current.error !== null);
    });
    expect(result.current).toEqual({ data: null, error: "Network error" });
  });
});
