export const sortByID = (a, b) => {
  return new Date(b.id) - new Date(a.id);
};

// a simple function that sorts my posts by date.
