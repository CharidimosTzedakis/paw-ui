import { describe, it, Mock, vi, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import theCatAPI from "@api/catApiClient.ts";
import { useLocation } from "wouter";
import ExploreBreedModal from "./exploreBreedModal";
import { catImagesBirmanBreed } from "@test/fixtures";
import type { AvailableBreedsEnumType } from "@api/types";
import { availableBreeds } from "@api/constants/availableBreeds";

vi.mock("@api/catApiClient", () => ({
  default: {
    images: {
      searchImages: vi.fn(),
    },
  },
}));

vi.mock("wouter", async () => {
  const actual = await vi.importActual("wouter");

  return {
    ...actual,
    useLocation: vi.fn(() => ["/current-path", vi.fn()]),
  };
});

describe("<ExploreBreedModal/>", () => {
  it("should render correctly in loading state", () => {
    (theCatAPI.images.searchImages as Mock).mockImplementation(
      () => new Promise(() => {}),
    );

    render(
      <ExploreBreedModal
        breedId={availableBreeds.BIRMAN as AvailableBreedsEnumType}
      />,
    );

    expect(document.body).toMatchSnapshot();
  });

  it("should render correctly a list of images for a specific breed", async () => {
    (theCatAPI.images.searchImages as Mock).mockResolvedValueOnce(
      catImagesBirmanBreed,
    );

    render(
      <ExploreBreedModal
        breedId={availableBreeds.BIRMAN as AvailableBreedsEnumType}
      />,
    );

    await waitFor(() => {
      expect(screen.queryByText("Image placeholder")).not.toBeInTheDocument();
    });

    expect(document.body).toMatchSnapshot();
  });

  it("should navigate to  parent route when the 'close' button is clicked", async () => {
    const setLocation = vi.fn();
    (useLocation as Mock).mockReturnValue(["/current-path", setLocation]);
    (theCatAPI.images.searchImages as Mock).mockResolvedValueOnce(
      catImagesBirmanBreed,
    );

    render(
      <ExploreBreedModal
        breedId={availableBreeds.BIRMAN as AvailableBreedsEnumType}
      />,
    );

    await waitFor(() => {
      expect(screen.queryByText("Image placeholder")).not.toBeInTheDocument();
    });

    const closeButton = screen.getByLabelText("Close");
    await userEvent.click(closeButton);

    expect(setLocation).toHaveBeenCalledTimes(1);
    expect(setLocation).toHaveBeenCalledWith("/");
  });
});
