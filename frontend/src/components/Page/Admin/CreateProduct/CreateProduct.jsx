import React from "react";
import { CreateProductStyled } from "./style";
import { useGetStateDispatch } from "../../../../hooks/useGetStateDispatch/useGetStateDispatch";
import { propsCategories, propsSuppliers } from "./props";
import { Button } from "../../../common/button/Button";
import InputFile from "../../../common/InputFile/InputFile";
import InputNumber from "../../../common/InputNumber/InputNumber";
import SelectBox from "../../../common/SelectBox/SelectBox";
import TextArea from "../../../common/TextArea/TextArea";
import InputName from "../../../common/InputName/InputName";
import { useDispatch, useSelector } from "react-redux";
import { actionGenerator } from "../../../../services/actionGenerator";
import {
  SET_CREATE_PRODUCT_NAME,
  SET_CREATE_SALE_PRICE,
  SET_CREATE_PRODUCT_PURCHASE_PRICE,
  SET_CP_STOCK,
  SET_CP_DESCRIPTION,
  SET_CP_CATEGORIES,
  SET_CP_SUPPLIERS,
} from "../../../../redux/reducers/createProduct/const";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const { allCategories } = useGetStateDispatch(propsCategories);
  const { allSuppliers } = useGetStateDispatch(propsSuppliers);
  const { categories, suppliers } = useSelector((state) => state.createProduct);
  const handleOnChangeInputs = ({ e, type }) => {
    const value = e.target.value;
    dispatch(actionGenerator(type, value));
  };
  const handleOnSubmitCreateProduct = (e) => {
    e.preventDefault();
  };
  const handleCategories = ({ dataSelectBox }) => {
    dispatch(actionGenerator(SET_CP_CATEGORIES, dataSelectBox));
  };
  const handleSuppliers = ({ dataSelectBox }) => {
    dispatch(actionGenerator(SET_CP_SUPPLIERS, dataSelectBox));
  };
  return (
    <CreateProductStyled onSubmit={handleOnSubmitCreateProduct}>
      <InputName
        handleChange={(e) =>
          handleOnChangeInputs({ e, type: SET_CREATE_PRODUCT_NAME })
        }
      />
      <InputNumber
        placeholder="sale price"
        handleChange={(e) =>
          handleOnChangeInputs({ e, type: SET_CREATE_SALE_PRICE })
        }
      />
      <InputNumber
        placeholder="purchise price"
        handleChange={(e) =>
          handleOnChangeInputs({ e, type: SET_CREATE_PRODUCT_PURCHASE_PRICE })
        }
      />
      <InputNumber
        placeholder="stock"
        handleChange={(e) => handleOnChangeInputs({ e, type: SET_CP_STOCK })}
      />
      <TextArea
        handleChange={(e) =>
          handleOnChangeInputs({ e, type: SET_CP_DESCRIPTION })
        }
      />
      <InputFile />
      <InputFile />
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
