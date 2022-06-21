class ProductModel {
    public id: string;
    public name: string;
    public price: number;
    public stock: number;
    public imageName: string;
    public image: FileList;
    public categoryId: string;


    public static convertToFormData(product: ProductModel): FormData {
        const myFormData = new FormData();
        myFormData.append("name", product.name);
        myFormData.append("price", product.price.toString());
        myFormData.append("stock", product.stock.toString());
        myFormData.append("categoryId", product.categoryId.toString());
        if (product.image) myFormData.append("image", product.image.item(0));
        return myFormData;
    }

}

export default ProductModel;