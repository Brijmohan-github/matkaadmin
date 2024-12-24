import { useContext } from "react";
import { TokenContext } from "./tokenProvider";

export function useToken() {
  return useContext(TokenContext);
}
