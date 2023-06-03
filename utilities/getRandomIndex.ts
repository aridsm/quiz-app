function getRandomIndex(max: number, usedIndexes: number[] = []): number {
  let randomIndex = Math.floor(Math.random() * max);
  if (usedIndexes.includes(randomIndex)) {
    randomIndex = getRandomIndex(max, usedIndexes);
  }
  return randomIndex;
}

export default getRandomIndex;
