import { describe, it, Mock, vi, expect } from "vitest";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useLocation } from "wouter";
import BreedView from "./breedView";

vi.mock("wouter", async () => {
  const actual = await vi.importActual("wouter");

  return {
    ...actual,
    useLocation: vi.fn(() => ["/current-path", vi.fn()]),
  };
});

describe("<BreedView/>", () => {
  it("should render correctly the list of the available cat breeds", () => {
    const { container } = render(<BreedView />);
    expect(container).toMatchSnapshot();
  });

  it("should navigate to the explore breed modal when a breed is clicked", async () => {
    const setLocation = vi.fn();
    (useLocation as Mock).mockReturnValue(["/current-path", setLocation]);

    const { container } = render(<BreedView />);
    const aegeanBreed = container.querySelector("[data-breed-id='aege']");

    await userEvent.click(aegeanBreed!);

    await waitFor(() => expect(setLocation).toHaveBeenCalledTimes(1));
    expect(setLocation).toHaveBeenCalledWith("/aege");
  });

  it("should navigate to the explore breed modal when a breed is selected using the keyboard", async () => {
    const setLocation = vi.fn();
    (useLocation as Mock).mockReturnValue(["/current-path", setLocation]);

    const { container } = render(<BreedView />);
    const aegeanBreed = container.querySelector(
      "[data-breed-id='aege']",
    ) as HTMLElement;

    aegeanBreed.focus();
    expect(aegeanBreed).toHaveFocus();

    await userEvent.keyboard("{enter}");

    await waitFor(() => expect(setLocation).toHaveBeenCalledTimes(1));
    expect(setLocation).toHaveBeenCalledWith("/aege");
  });
});
