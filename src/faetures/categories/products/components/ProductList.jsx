import { useProductsContext } from "../../../../contexts/app/ProductsContext";
// import { useLoaderData } from "react-router-dom"
import Product from "./Product";
const ProductList = ({products , deletePro})=>{
    const {filteredProducts} =useProductsContext()
    return (
        <div className="products w-full grid grid-cols-4 gap-4">
            {
                filteredProducts.map(p=>(
                    <Product deletePro={deletePro} {...p} key={p.id}/>
                ))
            }
      
      </div>
    )
}
export default ProductList