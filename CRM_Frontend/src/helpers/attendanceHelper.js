export const filterAttendanceByDate = (all, date) => {
  if (!Array.isArray(all) || !date)
    return { filtered: [], stats: { attended: 0, total: 0 } };

  const filtered = all.filter((item) => item?.dateAtt === date);
  const attendedList = filtered.filter(
    (e) => e?.attended?.toLowerCase() === "present"
  );

  return {
    filtered,
    stats: {
      attended: attendedList.length,
      total: filtered.length,
    },
  };
};
