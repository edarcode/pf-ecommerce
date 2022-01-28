import {
    ADD_PRODUCT,
    DELETE_PRODUCT,
    CHANGE_PRODUCT,
    SET_LOCAL_CART
} from "./consts";


const creator = function(type,payload){
    return {
        type,
        payload
    }
}

export const addProduct = function(id,price,count = null){
    return async function(dispatch){
        if(count===null){
            await dispatch(creator(ADD_PRODUCT,{product:{id,price}}))
        }else{
            await dispatch(creator(ADD_PRODUCT,{product:{id,price},count:count}))
        }
    }
}

export const deleteProduct = function(id){
    return async function(dispatch){
        await dispatch(creator(DELETE_PRODUCT,{id}))
    }
}

export const changeCountProduct = function (id,count){
    return async function(dispatch){
        await dispatch(creator(CHANGE_PRODUCT,{product:{id},count:count}))
    }
}

export const setLocalCart = function(localCart){
    return async function(dispatch){
        let cart = JSON.parse(localCart); 
        await dispatch(creator(SET_LOCAL_CART,cart.products))
    }
}