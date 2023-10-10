import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For extended DOM matchers
import Banner from "../Banner"; // Adjust the import path as needed

describe("Banner Component", () => {
  it("renders without errors", () => {
    render(<Banner />);
  });

  it("renders an image with the correct src attribute", () => {
    const imageUrl =
      "https://www.pichincha.com/content/published/api/v1.1/assets/CONT7950B3A6841A44C9A0B87D33A017CDAF/native?cb=_cache_ad42&channelToken=712a6518832146c488cdf196228d8c00";

    const { getByRole } = render(<Banner />);

    const image = getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", imageUrl);
  });
});
