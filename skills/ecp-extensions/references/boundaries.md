# Boundaries (vendor extensions)

| May depend on | Must not depend on |
| ------------- | ------------------ |
| `@executioncontrolprotocol/types` | `@executioncontrolprotocol/node` |
| `@executioncontrolprotocol/core` | `@executioncontrolprotocol/browser` |
| `zod` (peer) | `@executioncontrolprotocol/cli` |
| Focused vendor SDKs | `@executioncontrolprotocol/mcp` |

Hosts wrap core. Extensions stay portable.
