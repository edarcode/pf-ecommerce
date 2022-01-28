export default function CartObj(array = []){
    this.products=array;
    this.countProducts=this.products.length;
}

CartObj.prototype.existProduct = function(product){
    if(this.products.some((e)=>e.idProduct===product.id)) return true;
    return false;
}

CartObj.prototype.addProduct = function({product, count = 1}){
    if(this.existProduct(product)){
        return false;
    }else{
        this.products.push({
            idProduct: product.id,
            price: product.price,
            count: count
        });
        this.countProducts=this.products.length;
        return true;
    }
}

CartObj.prototype.deleteProduct = function(product){
    if(this.existProduct(product)){
        this.products=this.products.filter((e)=>e.idProduct!==product.id);
        this.countProducts=this.products.length;
        return true;
    }else{
        return false;
    }
}

CartObj.prototype.setCountProduct = function({product,count}){
    if(this.existProduct(product)){
        this.products=this.products.map((e)=>{
            if(e.idProduct===product){
                return {...e,count:count}
            }else{
                return e;
            }
        });
        return true;
    }else{
        return false;
    }
}

CartObj.prototype.getSubtotalPrice = function(){
    if(this.countProducts===0){
        return 0;
    }
    return this.products.reduce((pV,cV) => pV + (cV.count*cV.price))
}

CartObj.prototype.getTotalCount = function(){
    if(this.countProducts===0){
        return 0;
    }
    return this.products.reduce((pV,cV) => pV + cV.count)
}