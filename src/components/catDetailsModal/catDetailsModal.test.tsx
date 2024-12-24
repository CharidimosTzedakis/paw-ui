import { describe, it, vi, expect, Mock } from "vitest";
import theCatAPI from "@api/catApiClient";
import { render, screen } from "@testing-library/react";
import CatDetailsModal from "./catDetailsModal";
import { catImages } from "@test/fixtures";

vi.mock("@api/catApiClient", () => ({
  default: {
    images: {
      getImage: vi.fn(),
    },
  },
}));

describe("<CatDetailsModal />", () => {
  it("renders correctly in loading state", async () => {
    (theCatAPI.images.getImage as Mock).mockImplementation(
      () => new Promise(() => {}),
    );
    render(<CatDetailsModal id="catImageId" />);
    await screen.findByText(/Image placeholder/i);

    expect(theCatAPI.images.getImage).toHaveBeenCalledTimes(1);
    expect(theCatAPI.images.getImage).toHaveBeenCalledWith("catImageId");
    expect(document.body).toMatchSnapshot();
  });

  it("should render correctly for cat image with breed info", async () => {
    const catImageWithBreedInfo = catImages.find(
      (image) => image.breeds!.length > 0,
    );
    (theCatAPI.images.getImage as Mock).mockResolvedValueOnce(
      catImageWithBreedInfo,
    );

    render(<CatDetailsModal id={catImageWithBreedInfo!.id} />);

    await screen.findAllByText(/Oriental/i);
    expect(document.body).toMatchSnapshot();
  });

  it("should render correctly for cat image with no breed info", async () => {
    const catImageWithNoBreedInfo = catImages.find(
      (image) => image.breeds!.length === 0,
    );
    (theCatAPI.images.getImage as Mock).mockResolvedValueOnce(
      catImageWithNoBreedInfo,
    );

    render(<CatDetailsModal id={catImageWithNoBreedInfo!.id} />);

    await screen.findByText(/No breed information available for this cat./i);
    expect(document.body).toMatchSnapshot();
  });
});
