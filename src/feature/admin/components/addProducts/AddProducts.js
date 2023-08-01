import { useCallback, useState } from "react";
import styles from "./AddProduct.module.css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../../../firebase/config";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import Loader from "shared/components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "shared/constant/router";
const categoryData = [
  { title: "Book", id: 1 },
  { title: "Tshirt", id: 2 },
  { title: "Trousers", id: 3 },
  { title: "Notebook", id: 4 },
];
const initialState = {
  name: "",
  category: "",
  imgURL: "",
  price: 0,
  brand: "",
  desc: "",
};
const AddProducts = () => {
  const [product, setProduct] = useState({
    ...initialState,
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate=useNavigate();
  const handleChange = (e) => {
    const { value, name } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const addImageToStore = useCallback(
    (e) => {
      const file = e.target.files[0];
      const storageRef = ref(storage, `images/${Date.now()}${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(parseInt(progress));
        },
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProduct({ ...product, imgURL: downloadURL });
            toast.success("Image upload successfully");
          });
        }
      );
    },
    [uploadProgress, product]
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const docRef = addDoc(collection(db, "products"), {
        name: product.name,
        category: product.category,
        imgURL: product.imgURL,
        price: Number(product.price),
        brand: product.brand,
        desc: product.desc,
      });
      setIsLoading(false);
      setUploadProgress(0);
      setProduct({ ...initialState });
      toast.success("Product upload successfully");
      navigate(ROUTER.VIEW_PRODUCTS)
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <>
      {isLoading && <Loader />}
      <div className={styles["add-product"]}>
        <form onSubmit={handleSubmit} className={styles["add-form"]}>
          <div className={styles.title}>Add new products</div>
          <div className={styles["form-group"]}>
            <label>Product name</label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              value={product.name}
              placeholder="Product name"
            />
          </div>

          <div className={styles["form-group"]}>
            <label>Product image</label>
            {uploadProgress > 0 && (
              <div className={styles["progress-bar"]}>
                <div className={styles.progress}>
                  {uploadProgress < 100
                    ? `Uploading ${uploadProgress} %`
                    : `Upload completed`}
                </div>
              </div>
            )}
            <input type="file" accept="image/*" onChange={addImageToStore} />

            {uploadProgress > 0 && (
              <input
                type="text"
                name="imgURL"
                onChange={handleChange}
                value={product.imgURL}
                placeholder="Img url"
              />
            )}
          </div>

          <div className={styles["form-group"]}>
            <label>Product price</label>
            <input
              onChange={handleChange}
              type="text"
              name="price"
              value={product.price}
              placeholder="Product price"
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="">Product category</label>
            <select
              onChange={handleChange}
              name="category"
              value={product.category}
            >
              {categoryData.map((cat) => (
                <option key={cat.id}>{cat.title}</option>
              ))}
            </select>
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="">Product company/brand</label>
            <input
              onChange={handleChange}
              type="text"
              name="brand"
              value={product.brand}
              placeholder="Product brand"
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="">Product description</label>
            <textarea
              onChange={handleChange}
              type="text"
              name="desc"
              value={product.desc}
              placeholder="Product description"
            ></textarea>
          </div>

          <button type="submit" className={styles["addb-btn"]}>
            Add product
          </button>
        </form>
      </div>{" "}
    </>
  );
};

export default AddProducts;
