function getLocalStorageItem(storageName: string) {
  let itemsStored: any = null;

  const gamesPlayedJSON =
    typeof window !== "undefined" ? localStorage.getItem(storageName) : null;

  if (gamesPlayedJSON) {
    itemsStored = JSON.parse(gamesPlayedJSON);
  }

  return itemsStored;
}

export default getLocalStorageItem;
