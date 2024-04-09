import * as fs from "fs";
import Fastify from "fastify";
import fastifyMiddie from "@fastify/middie";
import fastifyStatic from "@fastify/static";
import { fileURLToPath } from "node:url";
import { handler as ssrHandler } from "./dist/server/entry.mjs";

let privateKey: string = "";
let certificate: string = "";
try {
	privateKey = fs.readFileSync(
		"/etc/letsencrypt/live/meta-lang.com/privkey.pem",
		"utf8"
	);
	certificate = fs.readFileSync(
		"/etc/letsencrypt/live/meta-lang.com/cert.pem",
		"utf8"
	);
} catch(e){ }

const app = Fastify({
	logger: false,
	https: {
		key: privateKey,
		cert: certificate
	},
});

await app
	.register(fastifyStatic, {
		root: fileURLToPath(new URL("./dist/client", import.meta.url)),
	})
	.register(fastifyMiddie);

app.use(ssrHandler);

app.listen({ port: 80 });
