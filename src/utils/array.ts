/**
 * Array utility functions
 */

/**
 * Removes duplicates from an array
 * @param arr Array to deduplicate
 * @returns New array with duplicates removed
 */
export const unique = <T>(arr: T[]): T[] => [...new Set(arr)];

/**
 * Chunk array into smaller arrays of specified size
 * @param arr Array to chunk
 * @param size Size of each chunk
 * @returns Array of chunks
 */
export const chunk = <T>(arr: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

/**
 * Shuffle array using Fisher-Yates algorithm
 * @param arr Array to shuffle
 * @returns New shuffled array
 */
export const shuffle = <T>(arr: T[]): T[] => {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/**
 * Group array elements by key
 * @param arr Array to group
 * @param key Key to group by
 * @returns Object with grouped arrays
 */
export const groupBy = <T>(arr: T[], key: keyof T): Record<string, T[]> => {
  return arr.reduce((groups, item) => {
    const group = String(item[key]);
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(item);
    return groups;
  }, {} as Record<string, T[]>);
};

/**
 * Sort array by key
 * @param arr Array to sort
 * @param key Key to sort by
 * @param order Sort order ('asc' or 'desc')
 * @returns New sorted array
 */
export const sortBy = <T>(
  arr: T[],
  key: keyof T,
  order: 'asc' | 'desc' = 'asc'
): T[] => {
  return [...arr].sort((a, b) => {
    if (order === 'asc') {
      return a[key] > b[key] ? 1 : -1;
    } else {
      return a[key] < b[key] ? 1 : -1;
    }
  });
};

/**
 * Flatten nested array
 * @param arr Array to flatten
 * @returns New flattened array
 */
export const flatten = <T>(arr: T[]): T[] => {
  return arr.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flatten(item) : item);
  }, [] as T[]);
};

/**
 * Get difference between two arrays
 * @param arr1 First array
 * @param arr2 Second array
 * @returns Elements in arr1 not in arr2
 */
export const difference = <T>(arr1: T[], arr2: T[]): T[] => {
  return arr1.filter(item => !arr2.includes(item));
};

/**
 * Get intersection of two arrays
 * @param arr1 First array
 * @param arr2 Second array
 * @returns Elements present in both arrays
 */
export const intersection = <T>(arr1: T[], arr2: T[]): T[] => {
  return arr1.filter(item => arr2.includes(item));
};

/**
 * Get union of two arrays
 * @param arr1 First array
 * @param arr2 Second array
 * @returns All unique elements from both arrays
 */
export const union = <T>(arr1: T[], arr2: T[]): T[] => {
  return unique([...arr1, ...arr2]);
};

/**
 * Check if array is empty
 * @param arr Array to check
 * @returns True if array is empty
 */
export const isEmpty = <T>(arr: T[]): boolean => {
  return arr.length === 0;
};

/**
 * Get last element of array
 * @param arr Array to get last element from
 * @returns Last element or undefined
 */
export const last = <T>(arr: T[]): T | undefined => {
  return arr[arr.length - 1];
};

/**
 * Get first element of array
 * @param arr Array to get first element from
 * @returns First element or undefined
 */
export const first = <T>(arr: T[]): T | undefined => {
  return arr[0];
};

/**
 * Remove elements from array
 * @param arr Array to remove from
 * @param elements Elements to remove
 * @returns New array with elements removed
 */
export const remove = <T>(arr: T[], elements: T[]): T[] => {
  return arr.filter(item => !elements.includes(item));
};

/**
 * Move array element from one index to another
 * @param arr Array to modify
 * @param fromIndex Source index
 * @param toIndex Destination index
 * @returns New array with element moved
 */
export const move = <T>(arr: T[], fromIndex: number, toIndex: number): T[] => {
  const newArray = [...arr];
  const [movedElement] = newArray.splice(fromIndex, 1);
  newArray.splice(toIndex, 0, movedElement);
  return newArray;
};

/**
 * Insert element at specific index
 * @param arr Array to insert into
 * @param index Index to insert at
 * @param element Element to insert
 * @returns New array with element inserted
 */
export const insert = <T>(arr: T[], index: number, element: T): T[] => {
  return [...arr.slice(0, index), element, ...arr.slice(index)];
};

/**
 * Update element at specific index
 * @param arr Array to update
 * @param index Index to update
 * @param element New element
 * @returns New array with element updated
 */
export const update = <T>(arr: T[], index: number, element: T): T[] => {
  return arr.map((item, i) => (i === index ? element : item));
};

/**
 * Find index of element in array
 * @param arr Array to search in
 * @param predicate Function to test elements
 * @returns Index of found element or -1
 */
export const findIndex = <T>(
  arr: T[],
  predicate: (item: T, index: number, array: T[]) => boolean
): number => {
  return arr.findIndex(predicate);
};

/**
 * Find element in array
 * @param arr Array to search in
 * @param predicate Function to test elements
 * @returns Found element or undefined
 */
export const find = <T>(
  arr: T[],
  predicate: (item: T, index: number, array: T[]) => boolean
): T | undefined => {
  return arr.find(predicate);
};

/**
 * Filter array by predicate
 * @param arr Array to filter
 * @param predicate Function to test elements
 * @returns New array with filtered elements
 */
export const filter = <T>(
  arr: T[],
  predicate: (item: T, index: number, array: T[]) => boolean
): T[] => {
  return arr.filter(predicate);
};

/**
 * Map array with transformation function
 * @param arr Array to map
 * @param transform Function to transform elements
 * @returns New array with transformed elements
 */
export const map = <T, U>(
  arr: T[],
  transform: (item: T, index: number, array: T[]) => U
): U[] => {
  return arr.map(transform);
};

/**
 * Reduce array to single value
 * @param arr Array to reduce
 * @param reducer Reducer function
 * @param initialValue Initial value
 * @returns Reduced value
 */
export const reduce = <T, U>(
  arr: T[],
  reducer: (accumulator: U, item: T, index: number, array: T[]) => U,
  initialValue: U
): U => {
  return arr.reduce(reducer, initialValue);
};

/**
 * Check if all elements pass predicate
 * @param arr Array to check
 * @param predicate Function to test elements
 * @returns True if all elements pass
 */
export const every = <T>(
  arr: T[],
  predicate: (item: T, index: number, array: T[]) => boolean
): boolean => {
  return arr.every(predicate);
};

/**
 * Check if any element passes predicate
 * @param arr Array to check
 * @param predicate Function to test elements
 * @returns True if any element passes
 */
export const some = <T>(
  arr: T[],
  predicate: (item: T, index: number, array: T[]) => boolean
): boolean => {
  return arr.some(predicate);
};

/**
 * Get array of specified property values
 * @param arr Array of objects
 * @param key Property key
 * @returns Array of property values
 */
export const pluck = <T, K extends keyof T>(arr: T[], key: K): T[K][] => {
  return arr.map(item => item[key]);
};

/**
 * Create array with range of numbers
 * @param start Start number
 * @param end End number
 * @param step Step between numbers
 * @returns Array of numbers in range
 */
export const range = (start: number, end: number, step: number = 1): number[] => {
  const arr: number[] = [];
  for (let i = start; i <= end; i += step) {
    arr.push(i);
  }
  return arr;
};

/**
 * Zip multiple arrays together
 * @param arrays Arrays to zip
 * @returns Array of zipped tuples
 */
export const zip = <T>(...arrays: T[][]): T[][] => {
  const maxLength = Math.max(...arrays.map(arr => arr.length));
  return Array.from({ length: maxLength }, (_, i) => arrays.map(arr => arr[i]));
};

/**
 * Rotate array elements
 * @param arr Array to rotate
 * @param positions Number of positions to rotate
 * @returns New rotated array
 */
export const rotate = <T>(arr: T[], positions: number): T[] => {
  const len = arr.length;
  const normalizedPositions = ((positions % len) + len) % len;
  return [...arr.slice(normalizedPositions), ...arr.slice(0, normalizedPositions)];
};

/**
 * Take first n elements from array
 * @param arr Array to take from
 * @param n Number of elements to take
 * @returns New array with first n elements
 */
export const take = <T>(arr: T[], n: number): T[] => {
  return arr.slice(0, n);
};

/**
 * Drop first n elements from array
 * @param arr Array to drop from
 * @param n Number of elements to drop
 * @returns New array with remaining elements
 */
export const drop = <T>(arr: T[], n: number): T[] => {
  return arr.slice(n);
};

/**
 * Take elements while predicate is true
 * @param arr Array to take from
 * @param predicate Function to test elements
 * @returns New array with elements taken
 */
export const takeWhile = <T>(
  arr: T[],
  predicate: (item: T, index: number, array: T[]) => boolean
): T[] => {
  const result: T[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i], i, arr)) {
      result.push(arr[i]);
    } else {
      break;
    }
  }
  return result;
};

/**
 * Drop elements while predicate is true
 * @param arr Array to drop from
 * @param predicate Function to test elements
 * @returns New array with elements dropped
 */
export const dropWhile = <T>(
  arr: T[],
  predicate: (item: T, index: number, array: T[]) => boolean
): T[] => {
  let dropIndex = 0;
  for (let i = 0; i < arr.length; i++) {
    if (!predicate(arr[i], i, arr)) {
      dropIndex = i;
      break;
    }
  }
  return arr.slice(dropIndex);
};

/**
 * Partition array into two arrays based on predicate
 * @param arr Array to partition
 * @param predicate Function to test elements
 * @returns Tuple of two arrays (truthy, falsy)
 */
export const partition = <T>(
  arr: T[],
  predicate: (item: T, index: number, array: T[]) => boolean
): [T[], T[]] => {
  const truthy: T[] = [];
  const falsy: T[] = [];
  
  arr.forEach((item, index, array) => {
    if (predicate(item, index, array)) {
      truthy.push(item);
    } else {
      falsy.push(item);
    }
  });
  
  return [truthy, falsy];
};

/**
 * Create array with n elements, all with same value
 * @param value Value to fill with
 * @param length Length of array
 * @returns New array filled with value
 */
export const fill = <T>(value: T, length: number): T[] => {
  return Array(length).fill(value);
};

/**
 * Check if array includes all elements from another array
 * @param arr Array to check
 * @param elements Elements to check for
 * @returns True if all elements are included
 */
export const includesAll = <T>(arr: T[], elements: T[]): boolean => {
  return elements.every(element => arr.includes(element));
};

/**
 * Check if array includes any element from another array
 * @param arr Array to check
 * @param elements Elements to check for
 * @returns True if any element is included
 */
export const includesAny = <T>(arr: T[], elements: T[]): boolean => {
  return elements.some(element => arr.includes(element));
};

/**
 * Get symmetric difference between two arrays
 * @param arr1 First array
 * @param arr2 Second array
 * @returns Elements in either array but not both
 */
export const symmetricDifference = <T>(arr1: T[], arr2: T[]): T[] => {
  return difference(union(arr1, arr2), intersection(arr1, arr2));
};

/**
 * Create array from start to end with step
 * @param start Start value
 * @param end End value
 * @param step Step value
 * @returns Array of values
 */
export const sequence = (start: number, end: number, step: number = 1): number[] => {
  const arr: number[] = [];
  for (let i = start; i <= end; i += step) {
    arr.push(i);
  }
  return arr;
};

/**
 * Get all permutations of array elements
 * @param arr Array to permute
 * @returns Array of all permutations
 */
export const permutations = <T>(arr: T[]): T[][] => {
  if (arr.length <= 1) return [arr];
  
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
    const remainingPermutations = permutations(remaining);
    
    for (const perm of remainingPermutations) {
      result.push([current, ...perm]);
    }
  }
  
  return result;
};

/**
 * Get all combinations of array elements of specified size
 * @param arr Array to combine
 * @param size Size of combinations
 * @returns Array of all combinations
 */
export const combinations = <T>(arr: T[], size: number): T[][] => {
  if (size === 0) return [[]];
  if (size > arr.length) return [];
  
  if (size === 1) {
    return arr.map(item => [item]);
  }
  
  const result: T[][] = [];
  for (let i = 0; i <= arr.length - size; i++) {
    const head = arr[i];
    const tailCombos = combinations(arr.slice(i + 1), size - 1);
    
    for (const combo of tailCombos) {
      result.push([head, ...combo]);
    }
  }
  
  return result;
};

/**
 * Sort array by multiple keys
 * @param arr Array to sort
 * @param keys Keys to sort by
 * @param orders Sort orders for each key
 * @returns New sorted array
 */
export const sortByMultiple = <T>(
  arr: T[],
  keys: (keyof T)[],
  orders: ('asc' | 'desc')[] = []
): T[] => {
  const defaultOrders = keys.map(() => 'asc' as const);
  const sortOrders = orders.length > 0 ? orders : defaultOrders;
  
  return [...arr].sort((a, b) => {
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const order = sortOrders[i];
      
      if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
    }
    return 0;
  });
};

/**
 * Group array elements by key with custom transform
 * @param arr Array to group
 * @param key Key to group by
 * @param transform Transform function for values
 * @returns Object with grouped and transformed arrays
 */
export const groupByTransform = <T, U>(
  arr: T[],
  key: keyof T,
  transform: (items: T[]) => U
): Record<string, U> => {
  const groups = groupBy(arr, key);
  
  const result: Record<string, U> = {};
  for (const [groupKey, items] of Object.entries(groups)) {
    result[groupKey] = transform(items);
  }
  
  return result;
};
