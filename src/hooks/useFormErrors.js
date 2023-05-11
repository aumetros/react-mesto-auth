import React from "react";

export function useFormErrors() {
  const [errors, setErrors] = React.useState({
    name: {
      required: true,
      minLenght: true,
      maxLength: true,
    },
    about: {
      required: true,
      minLenght: true,
      maxLength: true,
    },
    placeName: {
      required: true,
      minLenght: true,
      maxLength: true,
    },
    placeLink: {
      required: true,
      url: true,
    },
    avatarLink: {
      required: true,
      url: true,
    },
  });

  return { errors, setErrors };
}
