import "@testing-library/jest-dom";
import { it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";

it("should render a div element with text 'Hello, world!'", () => {
  render(<div>Hello, world!</div>);
  const element = screen.getByText("Hello, world!");
  expect(element).toBeDefined();
});
