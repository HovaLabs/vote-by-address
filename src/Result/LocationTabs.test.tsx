import React from "react";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { DesignSystemProvider } from "../design-system";
import { LocationTabs } from "./LocationTabs";

// This version of Testing Library's types doesn't include fireEvent
const click = (element: HTMLElement) => act(() => element.click());
const pressKey = (element: HTMLElement, key: string) =>
  act(() => {
    element.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }));
  });

const renderTabs = () =>
  render(
    <DesignSystemProvider>
      <LocationTabs
        tabs={[
          {
            id: "early-vote",
            label: "Early Voting",
            description: "Vote in person early.",
            count: 10,
            content: <p>Early vote table</p>,
          },
          {
            id: "drop-off",
            label: "Ballot Drop Boxes",
            description: "Drop off your ballot.",
            count: 9,
            content: <p>Drop box table</p>,
          },
          {
            id: "polling",
            label: "Polling Places",
            description: "Vote in person on Election Day.",
            count: 665,
            content: <p>Polling table</p>,
          },
        ]}
      />
    </DesignSystemProvider>
  );

describe("LocationTabs", () => {
  it("shows the first list and its description, and switches both when another tab is picked", () => {
    const { getByRole, getByText, queryByText } = renderTabs();

    expect(getByText("Early vote table")).toBeInTheDocument();
    expect(getByText("Vote in person early.")).toBeInTheDocument();
    expect(queryByText("Polling table")).toBeNull();

    const polling = getByRole("tab", { name: /Polling Places/ });
    click(polling);

    expect(polling).toHaveAttribute("aria-selected", "true");
    expect(getByRole("tabpanel")).toHaveTextContent("Polling table");
    expect(getByRole("tabpanel")).toHaveTextContent(
      "Vote in person on Election Day."
    );
    expect(queryByText("Vote in person early.")).toBeNull();
    expect(queryByText("Early vote table")).toBeNull();
  });

  it("moves between tabs with the arrow keys, wrapping at the ends", () => {
    const { getByRole } = renderTabs();
    const earlyVote = getByRole("tab", { name: /Early Voting/ });

    pressKey(earlyVote, "ArrowLeft");

    const polling = getByRole("tab", { name: /Polling Places/ });
    expect(polling).toHaveFocus();
    expect(getByRole("tabpanel")).toHaveTextContent("Polling table");

    pressKey(polling, "ArrowRight");

    expect(earlyVote).toHaveFocus();
    expect(getByRole("tabpanel")).toHaveTextContent("Early vote table");
  });

  it("shows how many locations each list has", () => {
    const { getByRole } = renderTabs();

    expect(getByRole("tab", { name: /Ballot Drop Boxes/ })).toHaveTextContent(
      "9"
    );
  });
});
