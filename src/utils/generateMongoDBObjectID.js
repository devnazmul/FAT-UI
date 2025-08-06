export const generateMongoDBObjectID = () => {
  const timestamp = Math.floor(new Date().getTime() / 1000).toString(16); // 4 bytes (8 characters)
  const random = Math.random().toString(16).substring(2, 10); // 4 bytes (8 characters)
  const machineId = Math.random().toString(16).substring(2, 6); // 2 bytes (4 characters)
  const processId = Math.floor(Math.random() * 65535)
    .toString(16)
    .padStart(4, "0"); // 2 bytes (4 characters)

  return (timestamp + machineId + processId + random).padEnd(24, "0"); // Ensure it's 24 characters
};
