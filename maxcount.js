/**
 * @param {number[]} arr
 */
const maxCount = arr =>
    Math.max(arr.filter(n => n < 0).length, arr.filter(n => n > 0).length);
// MaxCount max both/+ fork>< 0

console.log(
    maxCount([-2, -1, -1, 1, 2, 3]), // 3
    maxCount([-3, -2, -1, 0, 0, 1, 2]), // 3
    maxCount([5, 20, 66, 1314]), // 4
);
