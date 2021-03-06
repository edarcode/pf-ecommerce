/**
 * @param {Object} user - The user to verify
 * @param {Array} required - The required fields, is empty no required fiels.
 * @returns {Array, Boolean} - Array within errors and a boolean that check for all required fiels.
 */

export default function validateUser(user, required = []) {
  const errors = [];
  var mailformat =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (user.username && user.username.length < 6) {
    errors.push({
      type: "username",
      message: "must have at least 6 characters.",
    });
  }

  if (user.password && user.password.length < 8) {
    errors.push({
      type: "password",
      message: "must have at least 8 characters.",
    });
  }

  if (user.email && !user.email.match(mailformat)) {
    errors.push({
      type: "email",
      message: "it is not a valid one.",
    });
  }

  if (user.confirmpassword && user.confirmpassword !== user.password) {
    errors.push({
      type: "confirmpassword",
      message: "passwords must match.",
    });
  }

  const hasRequired = (required) => {
    for (const field of required) {
      if (!user[field]) {
        return true;
      }
    }
    return false;
  };

  return { errors, hasRequired: hasRequired(required) };
}
