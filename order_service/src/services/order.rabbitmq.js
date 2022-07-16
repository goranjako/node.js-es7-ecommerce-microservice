import amqp from "amqplib";
import Order from "../models/order.model";
let channel;

class RabbitMQ {


  async Create(kanal, data) {
    try {
      await channel.sendToQueue(kanal, Buffer.from(JSON.stringify({ data })));
    } catch (error) {
      console.log("Error in Connecting RabbitMQ!", error);
    }
  }

  
  async Conect() {
    try {
      const amqpServer = "amqp://localhost:5672";
      let connection = await amqp.connect(amqpServer);
      channel = await connection.createChannel();
      await channel.assertQueue("Product");
      console.log("Connecting RabbitMQ!");
      await this.Consum("Order");
    } catch (error) {
      console.log("Error in Connecting RabbitMQ!");
      process.exit(1);
    }
  }
  async Consum(ch) {
    try {
      channel.consume(ch, (data) => {
        const userData = JSON.parse(Buffer.from(data.content));
        channel.ack(data);
        console.log("Data konzum: ", userData);
        const order = new Order({
          user: userData.user,
          products: userData.products,
          totalPrice: userData.totalPrice,
          quantity: userData.quantity
      })
      const  obj =  Order(order).save();
        
        // Create("Product", userData);
        return userData;
      });
    } catch (error) {
        console.log("Error in Connecting RabbitMQ!", error);
    }
  }
}

export default new RabbitMQ();
