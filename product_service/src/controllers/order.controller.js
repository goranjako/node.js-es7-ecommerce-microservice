
import RabbitMQ from "../services/order.service";

class OrderController {
  // Insert
  async create(req, res) {
    
    try {
      const data = {
        owner:req.body.owner,
        product:req.body.product,
        quantity:req.body.quantity,
        totalPrice:req.body.totalPrice
       
      
      };
      console.log(data)
      await RabbitMQ.Create("Order", data);
      res.json({ msg: "Order submitted" });
     /* await channel.consume('Product', data => {
        order = JSON.parse(data.content);
      });
      res.json(order); */
    } 
      catch ( error) {
        res.status(422).json( error.message);
  }
}
}
export default new OrderController();
