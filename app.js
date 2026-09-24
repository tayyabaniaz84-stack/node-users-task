// app.js
// Task 2: Fetch users, filter by company catchPhrase, and format output.
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

// 2. Filter users whose company catchPhrase contains "group" or "service"
const filterUsersByCatchPhrase = (users) =>
  users.filter(({ company: { catchPhrase } }) => KEYWORD_REGEX.test(catchPhrase));

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
    const filteredUsers = filterUsersByCatchPhrase(users);
    const formattedUsers = formatUsers(filteredUsers);

    if (formattedUsers.length === 0) {
      console.log('No users found with "group" or "service" in their catchPhrase.');
      return;
    }

    console.log(`Found ${formattedUsers.length} matching user(s):\n`);
    formattedUsers.forEach((line) => console.log(line));
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

main();
