import { describe, it, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AppRoutes from "./appRoutes";

vi.mock("@views/catView", () => ({
  default: () => <div>Cat View</div>,
}));
vi.mock("@views/breedView", () => ({
  default: () => <div>Breed View</div>,
}));
vi.mock("@views/favouritesView", () => ({
  default: () => <div>Favourites View</div>,
}));

vi.mock("@components/catDetailsModal", () => ({
  default: ({ id }: { id: string }) => (
    <div>Cat details modal with id {id}</div>
  ),
}));

vi.mock("@components/exploreBreedModal", () => ({
  default: ({ breedId }: { breedId: string }) => (
    <div>Explore breeds modal with breedId {breedId}</div>
  ),
}));

describe("<AppRoutes/>", () => {
  it("should render the 'cat view' route", () => {
    window.history.pushState({}, "", "/cats");

    render(<AppRoutes />);

    expect(screen.getByText("Cat View")).toBeInTheDocument();
  });

  it('should render the "cat details modal" route', () => {
    window.history.pushState({}, "", "/cats/abc");

    render(<AppRoutes />);

    expect(screen.getByText("Cat View")).toBeInTheDocument();
    expect(
      screen.getByText("Cat details modal with id abc"),
    ).toBeInTheDocument();
  });

  it('should render the "breeds view" route', () => {
    window.history.pushState({}, "", "/breeds");

    render(<AppRoutes />);

    expect(screen.getByText("Breed View")).toBeInTheDocument();
  });

  it('should render the "explore breeds modal" route', () => {
    window.history.pushState({}, "", "/breeds/birman");

    render(<AppRoutes />);

    expect(screen.getByText("Breed View")).toBeInTheDocument();
    expect(
      screen.getByText("Explore breeds modal with breedId birman"),
    ).toBeInTheDocument();
  });

  it('should render the "favourites view" route', () => {
    window.history.pushState({}, "", "/favourites");

    render(<AppRoutes />);

    expect(screen.getByText("Favourites View")).toBeInTheDocument();
  });

  it('should redirect to the "cats view" route if the path is not valid', () => {
    window.history.pushState({}, "", "/invalid_path");

    render(<AppRoutes />);
    expect(screen.getByText("Cat View")).toBeInTheDocument();
  });
});
