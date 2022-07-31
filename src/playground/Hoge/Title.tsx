import React from "react";
import { TitleStyle } from "./styled";

export const Title = ({ title }: { title: string }) => {
  return <TitleStyle>{title}</TitleStyle>;
};
