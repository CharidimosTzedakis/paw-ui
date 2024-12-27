import { describe, it, Mock, vi, expect } from "vitest";
import { render, waitFor } from "@testing-library/react";
import theCatAPI from "@api/catApiClient";
import { favouriteImagesEntries } from "@test/fixtures";
import FavouritesView from "./favouritesView";

vi.mock("@api/catApiClient", () => ({
  default: {
    favourites: {
      getFavourites: vi.fn(),
    },
  },
}));

describe("<FavouritesView/>", () => {
  it("should render correctly with skeletons in loading state", () => {
    (theCatAPI.favourites.getFavourites as Mock).mockImplementation(
      () => new Promise(() => {}),
    );

    const { container } = render(<FavouritesView />);
    expect(container).toMatchSnapshot();
  });

  it("should render correctly the favourite images", async () => {
    (theCatAPI.favourites.getFavourites as Mock).mockResolvedValue(
      favouriteImagesEntries,
    );

    const { container } = render(<FavouritesView />);

    await waitFor(() =>
      expect(container.querySelector(".ant-card")).toBeInTheDocument(),
    );

    expect(container).toMatchSnapshot();
  });
});
