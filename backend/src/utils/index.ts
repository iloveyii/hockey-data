import moment from "moment";

/**
 * Get random items from the given array
 * @param items
 * @param random_count
 */
export function nRandomItems(items: any[], random_count: number) {
  // Get random_count random items from items
  const random10 = [...Array(random_count).keys()];
  const random_items = random10.map(() => {
    const num = items[Math.floor(Math.random() * items.length)];
    items = items.filter((item) => item !== num);
    return num;
  });
  return random_items.sort((a, b) => Number(a) - Number(b));
}

/**
 * Get timestamp round to number of seconds
 * @param seconds - Round to number of seconds
 */
export const roundTimestamp = (seconds: number) => {
  const timestamp = Date.now();
  const remainder = timestamp % (seconds * 1000);
  const rounded = timestamp - remainder;
  //   console.log(
  //     "ROUNDED ",
  //     moment(timestamp).format("YYYY-MM-DD h:mm:ss a"),
  //     moment(rounded).format("YYYY-MM-DD h:mm:ss a")
  //   );
  return rounded; // milliseconds
};
