import React from "react";
import { describe, it, Mock, vi, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import theCatAPI from "@api/catApiClient";
import { catImages } from "@test/fixtures";
import CatView from "./catView";

vi.mock("@api/catApiClient", () => ({
  default: {
    images: {
      searchImages: vi.fn(),
    },
  },
}));

vi.mock("react-virtualized-auto-sizer", () => {
  return {
    __esModule: true,
    default: ({
      children,
    }: {
      children: (props: { height: number; width: number }) => React.ReactNode;
    }) => children({ height: 1440, width: 1000 }),
  };
});

describe("<CatView/>", () => {
  it("should render correctly in loading state", async () => {
    (theCatAPI.images.searchImages as Mock).mockImplementation(
      () => new Promise(() => {}),
    );

    const { container } = render(<CatView />);

    await waitFor(() =>
      expect(
        container.querySelector(".ant-skeleton-image"),
      ).toBeInTheDocument(),
    );

    expect(container).toMatchSnapshot();
  });

  it("should render correctly", async () => {
    (theCatAPI.images.searchImages as Mock).mockResolvedValue(catImages);

    const { container } = render(<CatView />);

    await waitFor(() =>
      expect(
        container.querySelector(".ant-card-hoverable"),
      ).toBeInTheDocument(),
    );

    expect(container).toMatchSnapshot();
  });

  it("should load more cat images when clicking in load more button", async () => {
    (theCatAPI.images.searchImages as Mock).mockResolvedValue(catImages);

    const { container } = render(<CatView />);

    await waitFor(() =>
      expect(
        container.querySelector(".ant-card-hoverable"),
      ).toBeInTheDocument(),
    );

    const loadMoreButton = screen.getByRole("button", { name: /load more/i });
    await userEvent.click(loadMoreButton);

    // for this screen size, react-window loads 12 elements in the DOM instead of 20
    await waitFor(() =>
      expect(container.querySelectorAll(".ant-card-hoverable").length).toBe(12),
    );

    expect(container).toMatchSnapshot();
  });
});
