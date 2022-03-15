import { GET_DIRECTORY_URL } from "./constants";

export const getItemsInDirectory = async (path, clientId) => {
  const resp = await fetch(`${GET_DIRECTORY_URL}?path=${path}&clientId=${clientId}`);
  const items = await resp.json();
  return items;
};
