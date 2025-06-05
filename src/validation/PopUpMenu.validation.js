// handle error
export const validations = (data) => {
  const error = {};
  if (!data.username) error.username = "User name is required!";
  if (!data.email) error.email = "Email is required!";
  if (!data.password) error.password = "Password is required!";
  if (!data.projectName) error.projectName = "Project name is required!";
  return error;
};
