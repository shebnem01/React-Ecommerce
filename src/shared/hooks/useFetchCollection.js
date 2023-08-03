import { db } from "../../firebase/config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useFetchCollection = (collectionName) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getCollection = () => {
    setIsLoading(true);
    try {
      const docRef = collection(db, collectionName);
      const q = query(docRef, orderBy("name", "desc"));
      onSnapshot(q, (snapShot) => {
        const allData = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(allData);
        setIsLoading(false);
      });
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };
  useEffect(()=>{
    getCollection()
  },[])
  return {data,isLoading}
};
export default useFetchCollection;
