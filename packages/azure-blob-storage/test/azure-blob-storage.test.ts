import { describe, expect, it, vi, beforeEach, afterEach } from "vitest"
import { globalRegistry } from "@executioncontrolprotocol/core"

const uploadData = vi.fn()
const download = vi.fn()
const generateBlobSASQueryParameters = vi.fn()

vi.mock("@azure/storage-blob", () => {
  class StorageSharedKeyCredential {
    constructor(
      public accountName: string,
      public accountKey: string,
    ) {}
  }

  class BlobServiceClient {
    accountName: string
    constructor(
      public url: string,
      _cred?: unknown,
    ) {
      this.accountName = "testaccount"
    }
    static fromConnectionString(cs: string) {
      const name = /AccountName=([^;]+)/i.exec(cs)?.[1] ?? "fromcs"
      const client = new BlobServiceClient(`https://${name}.blob.core.windows.net`)
      client.accountName = name
      return client
    }
    getContainerClient(container: string) {
      return {
        getBlobClient: (blobName: string) => ({
          url: `https://testaccount.blob.core.windows.net/${container}/${blobName}`,
          download: (...args: unknown[]) => download(...args),
        }),
        getBlockBlobClient: (blobName: string) => ({
          url: `https://testaccount.blob.core.windows.net/${container}/${blobName}`,
          uploadData: (...args: unknown[]) => uploadData(...args),
        }),
      }
    }
  }

  return {
    BlobServiceClient,
    StorageSharedKeyCredential,
    BlobSASPermissions: {
      parse: (s: string) => ({ toString: () => s }),
    },
    SASProtocol: { Https: "https" },
    generateBlobSASQueryParameters: (...args: unknown[]) =>
      generateBlobSASQueryParameters(...args),
  }
})

const {
  azureBlobStorageExtension,
  registerAzureBlobStorageExtension,
} = await import("../src/index.js")

type Handler = (input: unknown, ctx: unknown) => Promise<unknown>

function capability(id: string): Handler {
  const cap = azureBlobStorageExtension.capabilities.find((c) => c.id === id)
  if (!cap) throw new Error(`missing ${id}`)
  return cap.handler as Handler
}

const ctx = {
  extensionConfig: {
    accountName: "testaccount",
    accountKey: "dGVzdGtleQ==",
    defaultContainer: "artifacts",
  },
}

describe("@executioncontrolprotocol/azure-blob-storage", () => {
  beforeEach(async () => {
    await registerAzureBlobStorageExtension()
    uploadData.mockReset()
    download.mockReset()
    generateBlobSASQueryParameters.mockReset()
    uploadData.mockResolvedValue({ etag: '"etag-1"' })
    generateBlobSASQueryParameters.mockReturnValue({
      toString: () => "sv=2024&sig=fake",
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("registers upload, create-sas-url, and download", () => {
    const ext = globalRegistry.getExtension("@executioncontrolprotocol/azure-blob-storage")
    expect(ext).toBe(azureBlobStorageExtension)
    const ids = ext?.capabilities.map((c) => c.id) ?? []
    expect(ids).toEqual([
      "@executioncontrolprotocol/azure-blob-storage.upload",
      "@executioncontrolprotocol/azure-blob-storage.create-sas-url",
      "@executioncontrolprotocol/azure-blob-storage.download",
    ])
  })

  it("upload rejects when no source is provided", () => {
    const cap = azureBlobStorageExtension.capabilities.find(
      (c) => c.id === "@executioncontrolprotocol/azure-blob-storage.upload",
    )
    expect(cap?.inputSchema?.safeParse({}).success).toBe(false)
  })

  it("upload with contentBase64 returns blobUrl and optional sasUrl", async () => {
    const out = (await capability("@executioncontrolprotocol/azure-blob-storage.upload")(
      {
        contentBase64: Buffer.from("hello").toString("base64"),
        contentType: "text/plain",
        blobName: "hello.txt",
        createReadSas: true,
      },
      ctx,
    )) as {
      blobUrl: string
      sasUrl?: string
      container: string
      blobName: string
      etag?: string
    }

    expect(out.container).toBe("artifacts")
    expect(out.blobName).toBe("hello.txt")
    expect(out.blobUrl).toContain("hello.txt")
    expect(out.etag).toBe('"etag-1"')
    expect(out.sasUrl).toContain("sv=2024&sig=fake")
    expect(uploadData).toHaveBeenCalled()
    expect(generateBlobSASQueryParameters).toHaveBeenCalled()
  })

  it("create-sas-url returns expiresAt and permissions", async () => {
    const out = (await capability(
      "@executioncontrolprotocol/azure-blob-storage.create-sas-url",
    )(
      {
        blobName: "img.png",
        permissions: ["r", "w"],
        expiresInSeconds: 600,
      },
      ctx,
    )) as { sasUrl: string; expiresAt: string; permissions: string }

    expect(out.permissions).toBe("rw")
    expect(out.sasUrl).toContain("sig=fake")
    expect(Date.parse(out.expiresAt)).toBeGreaterThan(Date.now())
  })

  it("download returns contentBase64", async () => {
    async function* body() {
      yield Buffer.from("world")
    }
    download.mockResolvedValue({
      readableStreamBody: body(),
      contentType: "text/plain",
    })

    const out = (await capability("@executioncontrolprotocol/azure-blob-storage.download")(
      { blobName: "hello.txt" },
      ctx,
    )) as { contentBase64: string; contentType: string; blobName: string }

    expect(out.blobName).toBe("hello.txt")
    expect(out.contentType).toBe("text/plain")
    expect(Buffer.from(out.contentBase64, "base64").toString("utf8")).toBe("world")
  })

  it("throws without credentials", async () => {
    await expect(
      capability("@executioncontrolprotocol/azure-blob-storage.upload")(
        { contentBase64: "YQ==", blobName: "a" },
        { extensionConfig: {} },
      ),
    ).rejects.toThrow(/connectionString|accountName/)
  })
})
