import React, { useCallback, useState } from "react";

export const useForm = () => {
  const [state, setState] = useState({ title: "" });

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setState({
        ...state,
        [event.target.name]: event.target.value,
      });
    },
    [state]
  );

  return {
    state,
    handleChange,
  };
};
