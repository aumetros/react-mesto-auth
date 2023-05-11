export const validators = {
  name: {
    required: (value) => {
      return value === "";
    },
    minLenght: (value = "") => {
      return value.length < 2;
    },
    maxLength: (value = "") => {
      return value.length > 40;
    },
  },
  about: {
    required: (value) => {
      return value === "";
    },
    minLenght: (value = "") => {
      return value.length < 2;
    },
    maxLength: (value = "") => {
      return value.length > 200;
    },
  },
  placeName: {
    required: (value) => {
      return value === "";
    },
    minLenght: (value = "") => {
      return value.length < 2;
    },
    maxLength: (value = "") => {
      return value.length > 30;
    },
  },
  placeLink: {
    required: (value) => {
      return value === "";
    },
    url: (value) => {
      const regex = new RegExp(
        "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
      );
      return !regex.test(value);
    },
  },
  avatarLink: {
    required: (value) => {
      return value === "";
    },
    url: (value) => {
      const regex = new RegExp(
        "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
      );
      return !regex.test(value);
    },
  },
};
