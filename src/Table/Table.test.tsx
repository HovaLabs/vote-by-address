import React from "react";
import { render } from "@testing-library/react";
import { DesignSystemProvider } from "../design-system";
import Table from "./Table";

const locations = [
  {
    address: {
      locationName: "PIO PICO MIDDLE SCHOOL",
      line1: "1512 ARLINGTON AVE",
      city: "LOS ANGELES",
      state: "CA",
      zip: "90019",
    },
    latitude: 34.04,
    longitude: -118.32,
  },
  {
    address: {
      locationName: "POP UP VOTE CENTER 5",
      line1: "12400 IMPERIAL HWY",
      city: "NORWALK",
      state: "CA",
      zip: "90650",
    },
    latitude: 33.92,
    longitude: -118.07,
  },
];

const renderTable = () =>
  render(
    <DesignSystemProvider>
      <Table
        data={locations}
        columns={[
          { width: "3fr", name: "ADDRESS" },
          { width: "2fr", name: "NOTES" },
          { width: "1fr", name: "SOURCES" },
        ]}
        rows={[
          ["PIO PICO MIDDLE SCHOOL", "", "Voting Information Project"],
          ["POP UP VOTE CENTER 5", "", ""],
        ]}
        title="Your Early Vote Locations"
      />
    </DesignSystemProvider>
  );

describe("Table", () => {
  it("shows each row's own address, including the city", () => {
    const { getByText } = renderTable();

    expect(getByText("PIO PICO MIDDLE SCHOOL")).toBeInTheDocument();
    expect(getByText("LOS ANGELES, CA 90019")).toBeInTheDocument();
    expect(getByText("POP UP VOTE CENTER 5")).toBeInTheDocument();
    expect(getByText("NORWALK, CA 90650")).toBeInTheDocument();
  });

  it("hides columns with no data in any row, and marks other missing values N/A", () => {
    const { queryAllByText, getAllByText } = renderTable();

    expect(queryAllByText("NOTES")).toHaveLength(0);
    // The desktop header, plus a label in each row for mobile
    expect(getAllByText("SOURCES")).toHaveLength(3);
    expect(getAllByText("N/A")).toHaveLength(1);
  });
});
