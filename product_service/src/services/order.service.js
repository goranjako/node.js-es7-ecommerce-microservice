import Order from "../models/order";

class OrderService {
  static async getAll() {
    try {
      return await Order.find();
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const order = await Order.findById(id);
      return order;
    } catch (error) {
      throw error;
    }
  }

  static async addOrder(data) {
    try {
      const order = new Order(data);
      return await order.save();
    } catch (error) {
      throw error;
    }
  }

  static async update(id, data) {
    try {
      const order = await Order.findById({ _id: id }).exec();
      order.set(data);
      const result = await order.save();
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      return await Order.deleteOne(id);
    } catch (error) {
      throw error;
    }
  }
}

export default  OrderService;
