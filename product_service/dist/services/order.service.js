"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _amqplib = _interopRequireDefault(require("amqplib"));

let channel;

class RabbitMQ {
  async Conect() {
    try {
      const amqpServer = "amqp://localhost:5672";
      let connection = await _amqplib.default.connect(amqpServer);
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
      await channel.sendToQueue(kanal, Buffer.from(JSON.stringify({
        data
      })));
    } catch (error) {
      console.log("Error in Connecting RabbitMQ!", error);
    }
  }

  async Consume(kanal, data) {
    try {
      channel.consume(kanal, data => {
        const userData = JSON.parse(Buffer.from(data.content));
        channel.ack(data);
        console.log("Data konzum: ", userData);
        Create("Product", ...userData);
        return userData;
      });
    } catch (error) {
      console.log("Error in Connecting RabbitMQ!", error);
    }
  }

}

var _default = new RabbitMQ();

exports.default = _default;