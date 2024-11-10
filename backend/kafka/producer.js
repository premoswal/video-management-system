const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'video-management',
  brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer();

const produceEvent = async (topic, message) => {
  await producer.connect();
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
  await producer.disconnect();
};

module.exports = produceEvent;
