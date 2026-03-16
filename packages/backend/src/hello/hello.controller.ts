import type { FastifyPluginCallback } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { HelloService } from './hello.service';


export const helloController: FastifyPluginCallback = (instance, options, done) => {
    const helloService = new HelloService();

    const f = instance.withTypeProvider<ZodTypeProvider>();

    f.get(
        '/',
        () => `Hello ${helloService.hello()}`
    );

    done();
};
