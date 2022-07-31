import React from "react";
import { useForm } from "./internal/useForm";

export const Piyo = () => {
  const { state, handleChange } = useForm();

  return (
    <div>
      <form>
        <input
          type="text"
          name="title"
          value={state.title}
          onChange={handleChange}
        ></input>
      </form>
    </div>
  );
};
