interface SortData {
  (initial: any, data: any, nameA: any, nameB: any): void;
}

const getNestedProperty = (obj: any, path: string) => {
  const keys = path.split(".");
  return keys.reduce(
    (acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined),
    obj
  );
};

const sortData: SortData = (initial, data, nameA, nameB) => {
  return data?.sort((a: any, b: any) => {
    if (initial == "fiscal") {
      const yearA = parseInt(getNestedProperty(a, nameA));
      const yearB = parseInt(getNestedProperty(b, nameB));

      return yearA - yearB;
    } else {
      return a[nameA].localeCompare(b[nameB]);
    }
  });
};

export default sortData;
