export const filterByField = ({ query, field, minValue=4 }) => {
  const fieldValue = query[field];

  if (parseInt(fieldValue) < minValue) {
    return {
      [field]: parseInt(fieldValue),
    };
  }

  if (parseInt(fieldValue) >= minValue) {
    return {
      [field]: {
        gte: minValue,
      },
    };
  }

  return {};
};
