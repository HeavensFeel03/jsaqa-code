const sorting = require("../../app");

describe("Books names test suit", () => {
  it("Books names should be sorted in ascending order", () => {
    expect(
      sorting.sortByName([
        "Гарри Поттер",
        "Властелин Колец",
        "Волшебник изумрудного города",
      ])
    ).toEqual([
      "Властелин Колец",
      "Волшебник изумрудного города",
      "Гарри Поттер",
    ]);
  });

  it("No sorted books", () => {
    const input = ["Властелин Колец", "Волшебник изумрудного города"];
    const output = sorting.sortByName(input);
    const expected = ["Властелин Колец", "Волшебник изумрудного города"];
    expect(output).toEqual(expected);
  });
});
