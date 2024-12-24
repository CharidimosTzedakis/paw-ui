import { describe, it, expect } from "vitest";
import CatCard from "./catCard";
import { render } from "@testing-library/react";

describe("<CatCard/>", () => {
  it("should render correctly with provided image id and url", () => {
    const { container } = render(
      <CatCard id="imageId" imageUrl="https://exampleurl.com/image" />,
    );
    expect(container).toMatchSnapshot();
  });

  it("should render correctly as skeleton when no image id provided", () => {
    const { container } = render(
      <CatCard id={undefined} imageUrl={undefined} />,
    );

    expect(container).toMatchSnapshot();
  });
});
