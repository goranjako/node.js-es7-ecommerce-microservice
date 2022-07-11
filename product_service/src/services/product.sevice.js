import Product from "../models/product";

class ProductService {
  static async getAll() {
    try {
      return await Product.find();
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const product = await Product.findById(id);
      return product;
    } catch (error) {
      throw error;
    }
  }

  static async addProduct(data) {
    try {
      const product = new Product(data);
      return await product.save();
    } catch (error) {
      throw error;
    }
  }

  static async update(id, data) {
    try {
      const product = await Product.findById({ _id: id }).exec();
      product.set(data);
      const result = await product.save();
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      return await Product.deleteOne(id);
    } catch (error) {
      throw error;
    }
  }
}

export default  ProductService;
