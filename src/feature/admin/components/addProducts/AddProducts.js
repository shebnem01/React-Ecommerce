import { useCallback, useEffect, useState } from "react";
import styles from "./AddProduct.module.css";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../../../firebase/config";
import { toast } from "react-toastify";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import Loader from "shared/components/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTER } from "shared/constant/router";
import { useSelector } from "react-redux";
import { selectProducts } from "redux/slice/productSlice";
import { categoryData } from "mock/categoryData";

const initialState = {
  name: "",
  category: "",
  imgURL: "",
  price: 0,
  brand: "",
  desc: "",
};

const AddProducts = () => {
  const params = useParams();
  const { id } = params;
  const detectForm = (id, f1, f2) => {
    if (id === "add") {
      return f1;
    }
    return f2;
  };
  const allProducts = useSelector(selectProducts);
  const findEditProduct = allProducts.find((item) => item.id === id);

  const [product, setProduct] = useState(() => {
    const productState = detectForm(
      id,
      { ...initialState },
      { ...findEditProduct }
    );
    return productState;
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const addImage = useCallback(
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

  const addProduct = (e) => {
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
      navigate("/admin/" + ROUTER.ALL_PRODUCTS);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if(product.imgURL!==findEditProduct.imgURL){
      const storageRef = ref(storage, findEditProduct.imgURL);
      deleteObject(storageRef);
    }
    try {
      setDoc(doc(db, "products", id), {
        name: product.name,
        category: product.category,
        imgURL: product.imgURL,
        price: Number(product.price),
        brand: product.brand,
        desc: product.desc,
      });
      setIsLoading(false);
      toast.success("Product edited successfully");console.log(findEditProduct.createdAt)
       navigate("/admin/" + ROUTER.ALL_PRODUCTS);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (id === "add") {
      setProduct({ ...initialState });
    }
  }, [id]);
  return (
    <>
      {isLoading && <Loader />}
      <div className={styles["add-product"]}>
        <form
          onSubmit={detectForm(id, addProduct, editProduct)}
          className={styles["add-form"]}
        >
          <div className={styles.title}>
            {detectForm(id, "Add new product", "Edit  Product")}
          </div>
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
            <input type="file" accept="image/*" onChange={addImage} />

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
            {detectForm(id, "Add  product", "Save  Product")}
          </button>
        </form>
      </div>{" "}
    </>
  );
};

export default AddProducts;
