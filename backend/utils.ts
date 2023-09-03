export const getUsers = async (url: string): Promise<User[]> => {
  const response = await fetch(url);
  const users: User[] = await response.json();
  return users;
};

export const getUser = async (url: string): Promise<User> => {
  const userResponse = await fetch(url);
  const user = await userResponse.json();
  return user;
};

export const getFirstUser = async (url: string): Promise<User> => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(await getUser(url));
    } catch (error) {
      reject("Some error occured");
    }
  });
};
