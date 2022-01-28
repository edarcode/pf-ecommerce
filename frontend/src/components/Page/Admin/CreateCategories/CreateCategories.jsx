import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../../../redux/reducers/categories/actions";
import { reqCreateCategory } from "../../../../redux/reducers/crud categories/actions";
import { Button } from "../../../common/button/Button";
import InputFile from "../../../common/InputFile/InputFile";
import InputName from "../../../common/InputName/InputName";
import { CreateCategorieStyled } from "./style";
import { validateCreateCategory } from "./validate";

function CreateCategories() {
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.categories.allCategories);
  const createCategory = useSelector((state) => state.createCategory);

  const [objError, setObjError] = useState(
    validateCreateCategory(createCategory)
  );

  useEffect(() => {
    setObjError(validateCreateCategory(createCategory));
  }, [createCategory]);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(reqCreateCategory(createCategory));
  };

  return (
    <CreateCategorieStyled>
      <h2>Categories {`(${allCategories.length})`}</h2>

      <div className="mainCategories">
        <div className="categories">
          <ul>
            {allCategories?.map((category, index) => (
              <li key={index}>
                {" "}
                {category.name}
                <Button
                  bgColor="#dc3545"
                  padding="10px 0"
                  hoverBgColor="#BB2D3B"
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="addCategories">
          <h3>Agregar Categoria </h3>
          <form action="" onSubmit={handleSubmit}>
            <InputName
              nameReducer="createCategory"
              type="SET_CREATE_CATEGORY_NAME"
              err={objError}
              keyErr="name"
            />
            <InputFile
              type="SET_CREATE_CATEGORY_IMG"
              err={objError}
              keyErr="img"
            />
            <Button type="submit" width="100%" padding="10px 0">
              Agregar
            </Button>
          </form>
        </div>
      </div>
    </CreateCategorieStyled>
  );
}

export default CreateCategories;
