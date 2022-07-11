import productService from "../services/product.sevice";

class ProductController {
  // Get all
  async getAll(req, res) {
    try {
      const docs = await productService.getAll();
      return res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
  // Insert
  async create(req, res, next) {
    try {
      const product = {
        code:req.body.code,
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        currency:req.body.currency,
        quantity:req.body.quantity,
        isfreeshipping:req.body.isfreeshipping
      };
      const obj = await productService.addProduct(product);
      return res
        .status(200)
        .json({ success: true, message: " Product is Created successfully." });
    } catch (err) {
      res.status(422).json(err.message);
    }
  }

  // Get by id
  async get(req, res) {
    try {
      const obj = await productService.getById({ _id: req.params.id });
      if (obj) {
        return res.status(200).json(obj);
      } else {
        return res.status(400).json({ error: "Product not found" });
      }
    } catch (err) {
      return res.status(400).json({ error: "Product not found" });
    }
  }

  // Update by id
  async put(req, res) {
    const data = {
      code: req.body.code,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      currency: req.body.currency,
      quantity: req.body.quantity,
      isfreeshipping: req.body.isfreeshipping,
    };
    const id = req.params.id;

    try {
      const product = await productService.update(id, data);
      return res
        .status(200)
        .json({ success: true, message: " Product is Updated successfully." });
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, message: "Product does not exist!" });
    }
  }
  // Delete by id
  async delete(req, res) {
    try {
      await productService.delete({ _id: req.params.id });
      return res.json({
        success: true,
        message: " Product is Deleted successfully.",
      });
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, message: "Product does not exist!" });
    }
  }
}

export default new ProductController();
