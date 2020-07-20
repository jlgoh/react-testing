import React from "react";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router";

import Root from "Root";
import App from "components/App";
import CommentBox from "components/CommentBox";
import CommentList from "components/CommentList";

// import { render } from "@testing-library/react";
// test("renders learn react link", () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// it("shows a comment box", () => {
//   //Craete a div element in terminal environment
//   const div = document.createElement("div");

//   //Render component
//   ReactDOM.render(<App />, div);

//   //Expectation
//   expect(div.innerHTML).toContain("Comment Box");

//   //Unmount component (Cleanup)
//   ReactDOM.unmountComponentAtNode(div);
// });

//Mock BrowserRouter to prevent overlap with MemoryRouter
const rrd = require("react-router-dom");
jest.spyOn(rrd, "BrowserRouter").mockImplementation(({ children }) => children);

let wrapped;

afterEach(() => wrapped.unmount());

it("shows a comment list", () => {
  wrapped = mount(
    <Root>
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    </Root>
  );
  expect(wrapped.find(CommentList).length).toEqual(1);
});

it("does not show a comment box when signed out", () => {
  wrapped = mount(
    <Root initialState={{ auth: false }}>
      <MemoryRouter initialEntries={["/post"]}>
        <App />
      </MemoryRouter>
    </Root>
  );

  expect(wrapped.find(CommentBox).length).toEqual(0);
});

it("shows a comment box when signed in", () => {
  wrapped = mount(
    <Root initialState={{ auth: true }}>
      <MemoryRouter initialEntries={["/post"]}>
        <App />
      </MemoryRouter>
    </Root>
  );

  // wrapped.find("button").simulate("click"); //Sign IN
  // wrapped.find("a").at(1).simulate("click", { button: 0 }); //Click Link

  expect(wrapped.find(CommentBox).length).toEqual(1);
});
