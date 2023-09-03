import { getUsers } from "./utils";

const USERS_URI = "https://jsonplaceholder.typicode.com/users";

describe("getUsers", () => {
  it("should get users", (done) => {
    getUsers(USERS_URI).then((users) => {
      console.log("in test");
      expect(users[0].name).toBe("Leanne Graham");
      done();
    });
  });

  it("should get users", async () => {
    const users = await getUsers(USERS_URI);
    console.log("in test");
    expect(users[0].name).toBe("Leanne Graham");
  });
});
