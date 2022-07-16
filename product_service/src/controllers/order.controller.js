import RabbitMQ from "../services/order.service";

class OrderController {
  // Insert
  async create(req, res) {
    try {
      let data = req.body;
      await RabbitMQ.Create("Order", data);
      await RabbitMQ.Consume("Product", res);
    } catch (error) {
      res.status(422).json(error.message);
    }
  }
}
export default new OrderController();
