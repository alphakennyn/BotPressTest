import { GET_DIRECTORY_URL } from "./constants";

export const getItemsInDirectory = async (path) => {
  const resp = await fetch(`${GET_DIRECTORY_URL}?path=${path}`);
  const items = await resp.json();
  return items;
};
