import { dbConnect, dbDisconnect } from "../src/database";
import LinkController from "../src/links/controllers";

beforeAll(async () => {
  await dbConnect();
});

afterAll(async () => {
  await dbDisconnect();
});

describe("Link Retreival Tests", () => {
  test("Get all links", async () => {
    const allLinks = await LinkController.getLinks();
    expect(allLinks.length).toBeGreaterThan(0);
    for (let link of allLinks) {
      expect(link.shortUrl).toBeDefined();
      expect(link.originalUrl).toBeDefined();
    }
  });
});
