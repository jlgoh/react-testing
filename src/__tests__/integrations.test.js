import React from "react";
import { MemoryRouter } from "react-router";
import { mount } from "enzyme";
import Root from "Root";
import App from "components/App";
import moxios from "moxios";

//Mock BrowserRouter to prevent overlap with MemoryRouter
const rrd = require("react-router-dom");
jest.spyOn(rrd, "BrowserRouter").mockImplementation(({ children }) => children);

beforeEach(() => {
  moxios.install();
  //Intercept request to this URL
  moxios.stubRequest("http://jsonplaceholder.typicode.com/comments", {
    status: 200,
    response: [{ name: "Fetched #1" }, { name: "Fetched #2" }],
  });
});

afterEach(() => {
  moxios.uninstall();
});

it("can fetch a list of comments and ", (done) => {
  //Attempt to render the *entire* app
  const wrapped = mount(
    <Root initialState={{ auth: true }}>
      <MemoryRouter initialEntries={["/post"]}>
        <App />
      </MemoryRouter>
    </Root>
  );

  //find the 'fetchComments' button and click it
  wrapped.find(".fetch-comments").simulate("click");

  //introduce a TINY little pause
  moxios.wait(() => {
    wrapped.update();

    wrapped.find("a").at(0).simulate("click", { button: 0 });

    //Expect to find a list of comments
    expect(wrapped.find(".fetched-comments").length).toEqual(2);

    //So that Jest will not end prematurely. We call it ourselves
    done();
    wrapped.unmount();
  });
});
