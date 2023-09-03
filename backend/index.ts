import PromisePool from "@supercharge/promise-pool";
import { getUser, getUsers, getFirstUser } from "./utils";

const USERS_URI = "https://jsonplaceholder.typicode.com/users";

/**
 * Promise then..catch syntax
 * The below code demonstrates promise based async code handling
 * Error thrown by inner fetch is not caught by outer fetch hence inner fetch also requires catch block
 * We can use - then, catch, and finally
 */
fetch(USERS_URI)
  .then((response) => response.json())
  .then((users: User[]) => {
    const firstUser = users[0];
    fetch(`${USERS_URI}/${firstUser.id}`)
      .then((response) => response.json())
      .then((user: User) => {
        console.log("Promise ->", user.name);
      })
      .catch((error) => console.error(error)); // this catch is required for inner fetch
  })
  .catch((error) => console.error(error)); // it only catches error for outer fetch and does not catch error thrown by inner fetch

/**
 * IIFE
 * The below function demonstrates use of async await
 * Async await syntax is cleaner and also catches any error from try block
 */
(async function () {
  try {
    const users = await getUsers(USERS_URI);

    const firstUser = users[0];
    const firstUserUri = `${USERS_URI}/${firstUser.id}`;

    const user = await getFirstUser(firstUserUri);

    console.log("Async-Await ->", user.name);
  } catch (error) {
    console.error(error);
  }
})();

/**
 * The below code shows how we can loop async requests
 */
const getUserNames = async () => {
  const users = await getUsers(USERS_URI);

  // Sending multiple async requests using for..of loop
  for (const user of users) {
    const url = `${USERS_URI}/${user.id}`;
    const response = await getUser(url);
    console.log(response.name);
  }

  // Sending multiple async requests using forEach loop
  users.forEach(async (user) => {
    const url = `${USERS_URI}/${user.id}`;
    const response = await getUser(url);
    console.log(response.name);
  });
};

/**
 * Promise.all
 */
const getAllUserNames = async () => {
  const users = await getUsers(USERS_URI);

  const data = await Promise.all(
    users.map((user) => getUser(`${USERS_URI}/${user.id}`))
  );

  console.log(data);
};

/**
 * Promise pool - execute multiple promises concurrently
 * This is a much faster approach for sending multiple async requests simultaneously
 * It does not result in connection overflow issue and fail the requests
 * When a pool is free then a new promise is added
 */
const getUserNamesPool = async () => {
  const users = await getUsers(USERS_URI);

  const { results, errors } = await PromisePool.for<User>(users)
    .withConcurrency(2)
    .process(async (user: User) => {
      return await getUser(`${USERS_URI}/${user.id}`);
    });

  console.log(results.map((user) => user.name));
};

getUserNamesPool();
