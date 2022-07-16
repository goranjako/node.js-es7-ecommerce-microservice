import amqp from "amqplib";
import { json } from "body-parser";
let channel;

class RabbitMQ {
  async Conect() {
    try {
      const amqpServer = "amqp://localhost:5672";
      let connection = await amqp.connect(amqpServer);
      channel = await connection.createChannel();
      await channel.assertQueue("Order");
      console.log("Connecting RabbitMQ!");
    } catch (error) {
      console.log("Error in Connecting RabbitMQ!");
      process.exit(1);
    }
  }

  async Create(kanal, data) {
    try {
      await channel.sendToQueue(kanal, Buffer.from(JSON.stringify({ data })));
    } catch (error) {
      console.log("Error in Connecting RabbitMQ!", error);
    }
  }

  async Consume(kanal) {
    try {
      channel.consume(kanal, (data) => {
        const userData = JSON.parse(Buffer.from(data.content));
        channel.ack(data);
        console.log("Data konzum: ", userData);
        return  userData;
      });
    } catch (error) {
        console.log("Error in Connecting RabbitMQ!", error);
    }
  }
}

export default new RabbitMQ();
