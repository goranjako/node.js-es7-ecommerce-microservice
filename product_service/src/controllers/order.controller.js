import RabbitMQ from "../services/order.service";

class OrderController {
  // Insert
  async create(req, res) {
    try {
      const data = {
        user: req.body.user,
        products: req.body.products,
        quantity: req.body.quantity,
        totalPrice: req.body.totalPrice,
      };
      await RabbitMQ.Create("Order", data);
      res.json({ msg: "Order submitted" });
      await channel.consume("Product", (data) => {
        order = JSON.parse(data.content);
      });
      res.json(order);
    } catch (error) {
      res.status(422).json(error.message);
    }
  }
}
export default new OrderController();
