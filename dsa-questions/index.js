// question 1
function lengthOfLIS(nums) {
  const dp = [];

  for (let num of nums) {
    let left = 0, right = dp.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (dp[mid] < num) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    dp[left] = num;
  }

  return dp.length;
}

const nums1 = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(lengthOfLIS(nums1));




// question 2
function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }

  return [];
}

const nums2 = [2, 7, 11, 15];
const target = 9;
console.log(twoSum(nums2, target));
