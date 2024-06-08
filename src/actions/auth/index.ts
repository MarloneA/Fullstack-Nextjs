type User = {
  name: string;
  email: string;
  password: string;
};

export const register = async (user: User) =>
  fetch("http://localhost:8080/api/auth/register", {
    method: "POST",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then(async (response) => {
    if (!response.ok) {
      const error = await response.json();

      throw new Error(
        `${response.status} - ${response.statusText} - ${error.message}`
      );
    }
    return response.json();
  });