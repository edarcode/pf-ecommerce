import axios from "axios";
import { store } from "../../store/index";
import { SELECT_CATEGORY, SELECT_TYPE_SORT } from "./consts";
import { actionCreator } from "../products/actions";
import { GET_ALL_PRODUCTS } from "../products/const";

function setFilterQuerys(filters,params){
    var querys='';
    if(filters.isDefault){
        return querys;
    }else{
        if(filters.category!==undefined && params!=='category'){
            querys=querys+`&idCategory=${filters.category.id}`
        }
        if(filters.sort!==undefined && params!=='sort'){
            querys=querys+`&typeOrder=${filters.sort}`
        }
    }
    return querys
}

export const selectCategory = function(category){
    return async function(dispatch){
        try {
            const filters= await store.getState().filters || {isDefault:true}
            var query= await setFilterQuerys(filters,'category');
            var url;
            if(category.id===-1 && category.name==='All'){
                if(query===''){
                    url='/products'
                }else{
                    url='/products?' + query.slice(1)
                }
            }else{
                url=`/products?idCategory=${category.id}` + query
            }
            const res= await axios.get(url);
            dispatch(actionCreator(GET_ALL_PRODUCTS,res.data))
            dispatch(actionCreator(SELECT_CATEGORY,category))
        } catch (error) {
            console.log(error);
            alert('Network error')
        }
    }
}

export const selectTypeSort = function(typeSort){
    return async function(dispatch){
        try {
            const filters= await store.getState().filters || {isDefault:true}
            var query= await setFilterQuerys(filters,'sort');
            const res= await axios.get(`/products?typeOrder=${typeSort}` + query)
            dispatch(actionCreator(GET_ALL_PRODUCTS,res.data));
            dispatch(actionCreator(SELECT_TYPE_SORT,typeSort))
        } catch (error) {
            console.log(error)
            alert('Network error')
        }
    }
}

export const changePage = function(page){
    return async function(dispatch){
        try {
            const filters= await store.getState().filters || {isDefault:true}
            var query= await setFilterQuerys(filters,'');
            const res= await axios.get(`/products?page=${page}`+query)
            dispatch(actionCreator(GET_ALL_PRODUCTS,res.data))
        } catch (error){
            console.log(error)
        }
    }
}