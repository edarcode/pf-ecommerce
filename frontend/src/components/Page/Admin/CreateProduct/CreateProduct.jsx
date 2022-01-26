import React, { useCallback, useEffect, useState } from "react";
import { CreateProductStyled } from "./style";
import { useGetStateDispatch } from "../../../../hooks/useGetStateDispatch/useGetStateDispatch";
import {
  propsCategories,
  propsDescription,
  propsName,
  propsPurchesePrice,
  propsSalePrice,
  propsStock,
  propsSuppliers,
} from "./props";
import { Button } from "../../../common/button/Button";
import InputFile from "../../../common/InputFile/InputFile";
import InputNumber from "../../../common/InputNumber/InputNumber";
import SelectBox from "../../../common/SelectBox/SelectBox";
import TextArea from "../../../common/TextArea/TextArea";
import InputName from "../../../common/InputName/InputName";
import { useDispatch, useSelector } from "react-redux";
import { actionGenerator } from "../../../../services/actionGenerator";
import {
  SET_CP_CATEGORIES,
  SET_CP_SUPPLIERS,
  SET_CP_IMGS,
  SET_CP_MAIN_IMG,
} from "../../../../redux/reducers/createProduct/const";
import { axiosPost } from "../../../../services/axios";
import { urlCloudinary } from "../../../../constants/cloudinary";
import { validateCreateProduct } from "./validate";
import { reqCreteProduct } from "../../../../redux/reducers/createProduct/actions";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const { allCategories } = useGetStateDispatch(propsCategories);
  const { allSuppliers } = useGetStateDispatch(propsSuppliers);
  const createProduct = useSelector((state) => state.createProduct);
  const { categories, suppliers } = useSelector((state) => state.createProduct);
  const [objError, setObjError] = useState(
    validateCreateProduct(createProduct)
  );

  useEffect(() => {
    setObjError(validateCreateProduct(createProduct));
  }, [createProduct]);

  const handleOnSubmitCreateProduct = (e) => {
    e.preventDefault();
    if (Object.keys(objError).length === 0) {
      dispatch(reqCreteProduct(createProduct));
    }
  };

  const handleCategories = useCallback(
    ({ dataSelectBox }) => {
      dispatch(actionGenerator(SET_CP_CATEGORIES, dataSelectBox));
    },
    [dispatch]
  );

  const handleSuppliers = useCallback(
    ({ dataSelectBox }) => {
      dispatch(actionGenerator(SET_CP_SUPPLIERS, dataSelectBox));
    },
    [dispatch]
  );

  const handleOnChangeImgs = async (e) => {
    const imgs = e.target.files;
    const allUrlsImgs = [];
    try {
      for (let i = 0; i < imgs.length; i++) {
        const element = imgs[i];
        const formData = new FormData();
        formData.append("file", element);
        formData.append("upload_preset", "pf-ecommerce");
        const data = await axiosPost(urlCloudinary, formData);
        const urlImg = data.secure_url;
        allUrlsImgs.push(urlImg);
      }
      dispatch(actionGenerator(SET_CP_IMGS, allUrlsImgs));
    } catch (error) {
      console.log(error);
      dispatch(actionGenerator(SET_CP_IMGS, []));
    }
  };
  const handleOnChangeImg = async (e) => {
    const imgs = e.target.files;
    const formData = new FormData();
    formData.append("file", imgs[0]);
    formData.append("upload_preset", "pf-ecommerce");
    try {
      const data = await axiosPost(urlCloudinary, formData);
      const urlImg = data.secure_url;
      dispatch(actionGenerator(SET_CP_MAIN_IMG, urlImg));
    } catch (error) {
      console.log(error);
      dispatch(actionGenerator(SET_CP_MAIN_IMG, ""));
    }
  };

  useEffect(() => {
    return () => {
      dispatch(actionGenerator(SET_CP_MAIN_IMG, ""));
      dispatch(actionGenerator(SET_CP_IMGS, []));
    };
  }, [dispatch]);
  return (
    <CreateProductStyled onSubmit={handleOnSubmitCreateProduct}>
      <InputName {...propsName} />
      <InputNumber {...propsSalePrice} />
      <InputNumber {...propsPurchesePrice} />
      <InputNumber {...propsStock} />
      <TextArea {...propsDescription} />
      <InputFile handleChange={handleOnChangeImg} />
      <InputFile handleChange={handleOnChangeImgs} multiple />
      <SelectBox
        data={allCategories}
        title={"categories"}
        action={handleCategories}
        init={categories}
      />
      <SelectBox
        data={allSuppliers}
        title={"suppliers"}
        action={handleSuppliers}
        init={suppliers}
      />
      <Button>Crear</Button>
    </CreateProductStyled>
  );
};

export default CreateProduct;
