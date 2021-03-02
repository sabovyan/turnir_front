const makeId = () => {
  let init = 0;

  return () => {
    init += 1;
    return init;
  };
};

export default makeId;
