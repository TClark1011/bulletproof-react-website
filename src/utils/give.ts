// Takes a value and creates a function that returns that value
// Simple way to make function calls with custom parameters inside pipes
const give = <T>(p:T) => () => p;

export default give