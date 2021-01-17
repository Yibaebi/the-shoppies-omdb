import React from "react";
import { ClipLoader, ScaleLoader } from "react-spinners";

export default function primaryLoader() {
  return <ClipLoader loading size={16} color="#fff" />;
}

export function MovieLoader() {
  return (
    <ScaleLoader color="#3f3d56" height={35} width={10} radius={4} margin={2} />
  );
}
