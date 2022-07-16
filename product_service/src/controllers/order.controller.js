import RabbitMQ from "../services/order.service";

class OrderController {
  // Insert
  async create(req, res) {
    
    try {
    let data =req.body;
      await RabbitMQ.Create("Order", data);
      res.json({ msg: "Order submitted" });
     /* await channel.consume("Product", (data) => {
        order = JSON.parse(data.content);
      });
      res.json(order);*/
    } catch (error) {
      res.status(422).json(error.message);
    }
  }
}
export default new OrderController();
