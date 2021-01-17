import React from "react";
import { ClipLoader, ScaleLoader } from "react-spinners";

export default function primaryLoader() {
  return <ClipLoader loading size={14} color="#fff" />;
}

export function MovieLoader() {
  return (
    <ScaleLoader color="#3f3d56" height={25} width={2} radius={2} margin={2} />
  );
}
