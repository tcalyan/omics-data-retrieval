export async function calculateMean(numbers: number[]): Promise<number | null> {
  if (numbers.length === 0) {
    return null;
  }
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}
export async function calculateMedian(
  numbers: number[]
): Promise<number | null> {
  const sortedNumbers = numbers.slice().sort((a, b) => a - b);

  const middle = Math.floor(sortedNumbers.length / 2);

  if (sortedNumbers.length % 2 === 0) {
    const middleValue1 = sortedNumbers[middle - 1];
    const middleValue2 = sortedNumbers[middle];
    return (middleValue1 + middleValue2) / 2;
  } else {
    return sortedNumbers[middle];
  }
}
export async function calculateVariance(
  numbers: number[]
): Promise<number | null> {
  if (numbers.length === 0) {
    return null;
  }
  const mean = numbers.reduce((acc, num) => acc + num, 0) / numbers.length;
  const squaredDifferences = numbers.map((num) => Math.pow(num - mean, 2));
  const variance =
    squaredDifferences.reduce((acc, squaredDiff) => acc + squaredDiff, 0) /
    numbers.length;
  return variance;
}
