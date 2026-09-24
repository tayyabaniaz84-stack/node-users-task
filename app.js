// app.js
// Task 2: Fetch users, filter by company (name + catchPhrase), and format output.
// Requires Node.js 18+ (built-in fetch).

const API_URL = "https://jsonplaceholder.typicode.com/users";

// Matches the whole word "group" or "service" (case-insensitive)
const KEYWORD_REGEX = /\b(group|service)\b/i;

// 1. Fetch users from the API
const fetchUsers = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};

// 2. Filter users whose company name or catchPhrase contains "group" or "service"
const filterUsers = (users) =>
  users.filter(({ company: { name, catchPhrase } }) =>
    KEYWORD_REGEX.test(`${name} ${catchPhrase}`)
  );

// 3. Transform into formatted strings using object destructuring
const formatUsers = (users) =>
  users.map(
    ({ name, email, address: { city } }) =>
      `User: ${name} | Email: ${email} | City: ${city}`
  );

// Main
const main = async () => {
  try {
    const users = await fetchUsers();
    const filteredUsers = filterUsers(users);
    const formattedUsers = formatUsers(filteredUsers);

    console.log(`Matching users: ${formattedUsers.length}`);
    console.log(formattedUsers);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

main();
