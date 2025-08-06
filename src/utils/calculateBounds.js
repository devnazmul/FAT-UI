export const calculateBounds = (coordinates) => {
  let north = -Infinity,
    south = Infinity;
  let east = -Infinity,
    west = Infinity;

  coordinates.forEach((coord) => {
    const { latitude, longitude } = coord;

    if (latitude > north) north = latitude; // Highest latitude
    if (latitude < south) south = latitude; // Lowest latitude

    if (longitude > east) east = longitude; // Highest longitude
    if (longitude < west) west = longitude; // Lowest longitude
  });

  return { north, south, east, west };
};
