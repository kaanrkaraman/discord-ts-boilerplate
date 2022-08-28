import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyHandlerOptions } from "../api";

export async function handle(request: FastifyRequest, reply: FastifyReply) {
   request && reply.send("Serving!");
}

export const options = {} as FastifyHandlerOptions;
