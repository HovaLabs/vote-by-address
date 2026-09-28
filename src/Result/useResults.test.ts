import { getStateInfo } from "./useResults";

describe("getStateInfo", () => {
  it("shows N/A cells when Google has no election office details yet", () => {
    const data = ({
      state: [
        {
          name: "California",
          sources: [{ name: "Voting Information Project", official: true }],
        },
      ],
    } as unknown) as Parameters<typeof getStateInfo>[0];

    expect(getStateInfo(data).rowsStateInfo).toEqual([
      ["", "", "", "", "Voting Information Project"],
    ]);
  });
});
