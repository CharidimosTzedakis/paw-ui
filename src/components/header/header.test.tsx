import { describe, it, vi, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppHeader from "./header";

vi.mock("wouter", async () => {
  const actual = await vi.importActual("wouter");

  return {
    ...actual,
    useLocation: vi.fn(() => ["/current-path", vi.fn()]),
  };
});

describe("<AppHeader/>", () => {
  it("should render correctly", async () => {
    const { container } = render(
      <AppHeader theme="light" toggleTheme={() => {}} />,
    );

    await waitFor(() => screen.getByText(/Cats/i));

    expect(container).toMatchSnapshot();
  });

  it("should toggle theme when theme switch is clicked", async () => {
    const toggleTheme = vi.fn();
    render(<AppHeader theme="light" toggleTheme={toggleTheme} />);

    await waitFor(() => screen.getByText(/Cats/i));

    const themeSwitch = screen.getByRole("switch", { checked: false });
    await userEvent.click(themeSwitch);

    expect(toggleTheme).toHaveBeenCalledTimes(1);
    expect(toggleTheme).toHaveBeenCalledWith(true, expect.anything());
  });
});
