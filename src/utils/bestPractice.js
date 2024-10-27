/**
 * Divides two numbers
 * @param {number} num1 - The numerator
 * @param number*} num2 - The denominator. Mus not be zero.
 * @returns {number|null} - The result of the division or null if invalid input.
 * @throws {Error} - Throws error if num2 is zero
 */
const divide = (num1, num2) => {
  // 1. input validation
  if (typeof num1 !== "number" || typeof num2 !== "number") {
    // 2. throw errors for critical failures
    // throw new Error("Invalid input. Both parameters must be numbers.");
    // 3. or return null or undefined for invalid operations
    return null;
  }

  if (num2 === 0) {
    throw new Error("Division by zero is not allowed.");
  }

  return num1 / num2;
};

const getFirstElement = (arr) => {
  // 3. return null or undefined for invalid operations
  if (!Array.isArray(arr) || arr.length === 0) return null;

  return arr[0];

  return num1 / num2;
};

// 4. use default values where meaningful

const greet = (name = "Guest") => {
  return `Hello, ${name}!`;
};

// 5. Typescript or jsdoc for during development

// 6. Return early for edge cases - exit early to avoid complex logic

// 7. Document how function handles invalid inputs

// Call with catch

try {
  console.log(divide(10, "text"));
} catch (err) {
  console.error(err.message);
}
