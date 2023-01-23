import validate from "validate.js";

export const validateString = (id: string, value: string) => {
  const constraints = {
    presence: { allowEmpty: false },
    length: { minimum: 3, maximum: 15 },
    format: { pattern: "[a-z0-9]+", flags: "i" },
  };

  const validationResult = validate({ [id]: value }, { [id]: constraints });
  return validationResult && validationResult[id];
};

export const validateEmail = (id: string, value: string) => {
  const constraints = {
    presence: { allowEmpty: false },
    email: true,
    length: { minimum: 3, maximum: 35 },
  };

  const validationResult = validate({ [id]: value }, { [id]: constraints });
  return validationResult && validationResult[id];
};

export const validatePassword = (id: string, value: string) => {
  const constraints = {
    presence: { allowEmpty: false },
    length: { minimum: 6, maximum: 25 },
  };

  const validationResult = validate({ [id]: value }, { [id]: constraints });
  return validationResult && validationResult[id];
};
