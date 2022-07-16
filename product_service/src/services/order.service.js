import amqp from "amqplib";

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

  async Create(chann, data) {
    try {
      await channel.sendToQueue(chann, Buffer.from(JSON.stringify({ data })));
    } catch (error) {
      console.log("Error in Connecting RabbitMQ!", error);
    }
  }

  async Consume(chann, res) {
    try {
      channel.consume(chann, async (data) => {
        const userData = await JSON.parse(Buffer.from(data.content));
        channel.ack(data);
        await res.status(201).json(userData);
      });
    } catch (error) {
      console.log("Error in Connecting RabbitMQ!", error);
    }
  }
}

export default new RabbitMQ();
