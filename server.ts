import * as fs from "fs";
import Fastify, { FastifyHttpsOptions } from "fastify";
import fastifyMiddie from "@fastify/middie";
import fastifyStatic from "@fastify/static";
import { fileURLToPath } from "node:url";
import { handler as ssrHandler } from "./dist/server/entry.mjs";

const options: { logger: boolean, https?: { key: string, cert: string }, ignoreTrailingSlash: boolean } = {
	logger: true,
	ignoreTrailingSlash: true,
}

try {
	const privateKey = fs.readFileSync(
		"/etc/letsencrypt/live/meta-lang.com/privkey.pem",
		"utf8"
	);
	const certificate = fs.readFileSync(
		"/etc/letsencrypt/live/meta-lang.com/cert.pem",
		"utf8"
	);

	if (privateKey && certificate) {
		options.https = {
			key: privateKey,
			cert: certificate
		};
	}
} catch(e){ }

const app = Fastify(options);

await app
	.register(fastifyStatic, {
		root: fileURLToPath(new URL("./dist/client", import.meta.url)),
	})
	.register(fastifyMiddie);

app.use(ssrHandler);

app.listen({ port: 80 });
