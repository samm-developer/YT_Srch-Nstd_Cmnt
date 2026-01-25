import React from "react";
import Button from "./Button";

const ButtonList = () => {
  return (
    <div className="flex overflow-x-auto whitespace-nowrap px-4 py-2">
      <Button name="All" />
      <Button name="Gaming" />
      <Button name="Songs" />
      <Button name="Live" />
      <Button name="Soccer" />
      <Button name="Cricket" />
      <Button name="Cooking" />
      <Button name="Valentines" />
      <Button name="Music" />
      <Button name="Sports" />
      <Button name="News" />
      <Button name="Comedy" />
    </div>
  );
};

export default ButtonList;
