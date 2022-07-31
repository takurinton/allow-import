import React from "react";
import { useForm } from "../Piyo/internal/useForm";
import { Title } from "./Title";
import { takurinton } from "../utils/takurinton";

export const Hoge = () => {
  const { state, handleChange } = useForm();

  return (
    <div>
      {takurinton}
      <form>
        <input
          type="text"
          name="title"
          value={state.title}
          onChange={handleChange}
        ></input>
      </form>
      <Title title={state.title} />
    </div>
  );
};
