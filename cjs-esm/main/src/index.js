import { executor } from './import_default.js';
import { executor as executorNamespace } from './import_namespace.js';

await executor();
await executorNamespace();