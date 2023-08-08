import Fastify from "fastify";
const fastify = Fastify({
  logger: true,
});

const toKebabCase = (value) =>
  value &&
  value
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join("-");

fastify.addHook("preSerialization", (request, reply, payload, done) => {
  let effectivePayload = payload;
  if (request.headers.accept === "application/json+kebabcase") {
    const newPayload = Object.keys(payload)
      .map((key) => ({ [toKebabCase(key)]: payload[key] }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {});

    effectivePayload = newPayload;
  }

  done(null, effectivePayload);
});

fastify.get("/", async function handler(request, reply) {
  return {
    pseudo: "Anthonny",
    favouritePokemon: "mimiqui",
  };
});

try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
