import { saveComment } from "actions";
import { SAVE_COMMENT } from "actions/types";

//Group each set of action creators with describe (e.g. saveComment, fetchComment)
describe("saveComment", () => {
  it("has the correct type", () => {
    const action = saveComment();

    expect(action.type).toEqual(SAVE_COMMENT);
  });

  it("has the correct payload", () => {
    const action = saveComment("New Comment");

    expect(action.payload).toEqual("New Comment");
  });
});
