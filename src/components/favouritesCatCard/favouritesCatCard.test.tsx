import { describe, it, Mock, vi, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import theCatAPI from "@api/catApiClient";
import FavouritesCatCard from "./favouritesCatCard";
import { useLocation } from "wouter";

vi.mock("wouter", async () => {
  const actual = await vi.importActual("wouter");

  return {
    ...actual,
    useLocation: vi.fn(() => ["/current-path", vi.fn()]),
  };
});

vi.mock("@api/catApiClient", () => ({
  default: {
    favourites: {
      deleteFavourite: vi.fn(),
    },
  },
}));

const FAVOURITES_ENTRY_ID = 123;

describe("<FavouritesCatCard />", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // or vi.resetAllMocks()
  });

  it("should render correctly", () => {
    const { container } = render(
      <FavouritesCatCard
        favouritesId={FAVOURITES_ENTRY_ID}
        imageId="imageId"
        imageUrl="https://example.com/image"
        onFavouritesRemove={() => {}}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should navigate to cat image details when "View details" button is clicked', async () => {
    const setLocation = vi.fn();
    (useLocation as Mock).mockReturnValue(["/current-path", setLocation]);

    render(
      <FavouritesCatCard
        favouritesId={FAVOURITES_ENTRY_ID}
        imageId="imageId"
        imageUrl="https://example.com/image"
        onFavouritesRemove={() => {}}
      />,
    );

    const closeButton = screen.getByText(/View details/i);
    await userEvent.click(closeButton);

    expect(setLocation).toHaveBeenCalledTimes(1);
    expect(setLocation).toHaveBeenCalledWith("../cats/imageId");
  });

  it('should remove the image from favourites when "Remove" button is clicked', async () => {
    const onFavouritesRemove = vi.fn();
    (theCatAPI.favourites.deleteFavourite as Mock).mockImplementation(() =>
      Promise.resolve({}),
    );

    render(
      <FavouritesCatCard
        favouritesId={FAVOURITES_ENTRY_ID}
        imageId="imageId"
        imageUrl="https://example.com/image"
        onFavouritesRemove={onFavouritesRemove}
      />,
    );

    const removeButton = screen.getByText(/Remove/i);
    await userEvent.click(removeButton);

    await waitFor(() =>
      expect(
        screen.getByText(
          "Are you sure you want to remove this image from your favourites?",
        ),
      ).toBeInTheDocument(),
    );

    const confirmButton = screen.getByRole("button", { name: /yes/i });
    await userEvent.click(confirmButton);

    await waitFor(() => expect(onFavouritesRemove).toHaveBeenCalledTimes(1));
    expect(theCatAPI.favourites.deleteFavourite).toHaveBeenCalledTimes(1);
    expect(theCatAPI.favourites.deleteFavourite).toHaveBeenCalledWith(
      FAVOURITES_ENTRY_ID,
    );
  });

  it('should not perform removal of favourite image if "No" is pressed during confirmation', async () => {
    const onFavouritesRemove = vi.fn();
    (theCatAPI.favourites.deleteFavourite as Mock).mockImplementation(() =>
      Promise.resolve({}),
    );

    render(
      <FavouritesCatCard
        favouritesId={FAVOURITES_ENTRY_ID}
        imageId="imageId"
        imageUrl="https://example.com/image"
        onFavouritesRemove={onFavouritesRemove}
      />,
    );

    const removeButton = screen.getByText(/Remove/i);
    await userEvent.click(removeButton);

    await waitFor(() =>
      expect(
        screen.getByText(
          "Are you sure you want to remove this image from your favourites?",
        ),
      ).toBeInTheDocument(),
    );

    const cancelButton = screen.getByRole("button", { name: /no/i });
    await userEvent.click(cancelButton);

    await waitFor(() => expect(onFavouritesRemove).not.toHaveBeenCalled());
    expect(theCatAPI.favourites.deleteFavourite).not.toHaveBeenCalled();
  });
});
