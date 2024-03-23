import { defineConfig } from '@yandex-cloud/serverless-live-debug';
import { Handler } from '@yandex-cloud/function-types';

export default defineConfig({
  handler: <Handler.Http>(event => {
    console.log('got request', event);
    return {
      statusCode: 200,
      body: `Hello from local code!`,
    };
  })
});