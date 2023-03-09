import { useEffect, useState } from "react";
//Like a useStae hook but specifically for our persist data.
const usePersist = () => {
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  return [persist, setPersist];
};
export default usePersist;
