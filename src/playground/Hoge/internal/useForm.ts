import React, { useCallback, useState } from "react";
import { hoge } from "../../utils/hoge";

export const useForm = () => {
  const [state, setState] = useState({ title: "" });

  console.log(hoge);

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
