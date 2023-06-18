async function getLocalStorageItem(storageName: string) {
  let itemsStored: any = null;

  const itemsJSON =
    typeof window !== "undefined" ? localStorage.getItem(storageName) : null;

  if (itemsJSON) {
    itemsStored = await JSON.parse(itemsJSON);
  }

  return itemsStored;
}

export default getLocalStorageItem;
