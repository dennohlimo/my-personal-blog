import React from "react";
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";
import Header from "./Components/Header";
import About from "./Components/About";
import Article from "./Components/Article";

describe("Components render correctly with initial props", () => {
  test("Header renders the blog name passed as a prop", () => {
    render(<App />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Premier League");
  });

  test("About renders the about text and logo image passed as props", () => {
    render(<App />);
    expect(screen.getByText("Premier League thoughts")).toBeInTheDocument();

    const logo = screen.getByAltText("blog logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute(
      "src",
      "https://resources.premierleague.pulselive.com/photo-resources/2018/05/06/9d2a4c84-d68f-47b8-bda6-ac39f1aaf42d/955249480.jpg?width=1440",
    );
  });

  test("ArticleList renders one Article per post, each with its title, date, and preview props", () => {
    render(<App />);

    // Title (h3) from each post
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Arsenal's Title Defence",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Enzo Maresca's shaky beginning",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Carrick needs backing" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Xabi Alonso's new tenure",
      }),
    ).toBeInTheDocument();

    // Date and preview text for one sample post
    expect(screen.getByText("14th August 2026")).toBeInTheDocument();
    expect(
      screen.getByText(/uphill battle to get Chelsea back to former heights/i),
    ).toBeInTheDocument();

    // Confirm the count matches the number of posts (4 <article> elements)
    const articles = document.querySelectorAll("article");
    expect(articles.length).toBe(4);
  });
});

describe("Props dynamically update rendered content", () => {
  test("Header updates its heading when the name prop changes", () => {
    const { rerender } = render(<Header name="Premier League" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Premier League",
    );

    rerender(<Header name="Championship" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Championship",
    );
    expect(screen.queryByText("Premier League")).not.toBeInTheDocument();
  });

  test("About updates its text and image when props change", () => {
    const { rerender } = render(
      <About
        image="https://example.com/original.jpg"
        about="Premier League thoughts"
      />,
    );
    expect(screen.getByText("Premier League thoughts")).toBeInTheDocument();
    expect(screen.getByAltText("blog logo")).toHaveAttribute(
      "src",
      "https://example.com/original.jpg",
    );

    rerender(
      <About
        image="https://example.com/updated.jpg"
        about="Championship thoughts"
      />,
    );
    expect(screen.getByText("Championship thoughts")).toBeInTheDocument();
    expect(
      screen.queryByText("Premier League thoughts"),
    ).not.toBeInTheDocument();
    expect(screen.getByAltText("blog logo")).toHaveAttribute(
      "src",
      "https://example.com/updated.jpg",
    );
  });

  test("Article updates its title, date, and preview when props change", () => {
    const { rerender } = render(
      <Article
        title="Carrick needs backing"
        date="16th August 2026"
        preview="The board needs to back Carrick with some new signings"
      />,
    );
    expect(screen.getByText("Carrick needs backing")).toBeInTheDocument();

    rerender(
      <Article
        title="Xabi Alonso's new tenure"
        date="14th August 2026"
        preview="Xabi Alonso has an uphill battle"
      />,
    );
    expect(screen.getByText("Xabi Alonso's new tenure")).toBeInTheDocument();
    expect(screen.getByText("14th August 2026")).toBeInTheDocument();
    expect(
      screen.getByText("Xabi Alonso has an uphill battle"),
    ).toBeInTheDocument();
    expect(screen.queryByText("Carrick needs backing")).not.toBeInTheDocument();
  });
});
