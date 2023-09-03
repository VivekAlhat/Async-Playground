const USERS_URI = "https://jsonplaceholder.typicode.com/users";

function getUsers(
  cb: (err: Error | undefined, users: User[] | undefined) => void
): void;

function getUsers(): Promise<User[]>;

function getUsers(
  cb?: (err: Error | undefined, users: User[] | undefined) => void
) {
  if (cb) {
    fetch(USERS_URI)
      .then((response) => response.json())
      .then((users: User[]) => cb(undefined, users))
      .catch((error) => cb(error, undefined));
    return undefined;
  } else {
    return fetch(USERS_URI).then((response) => response.json());
  }
}

getUsers((_err, data) => console.log(data?.length));
getUsers().then((data) => console.log(data.length));
