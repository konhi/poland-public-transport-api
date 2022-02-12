import request from "supertest";
import app from "../src/app";

describe("All routes", () => {
  describe("Correct routes statuses", () => {
    const VALID_ROUTES = [
      "/v1/zielonagora/mzk/infos",
      "/v1/zielonagora/mzk/stops",
      "/v1/zielonagora/mzk/stops/75/info",
      "/v1/zielonagora/mzk/stops/75/departures",
    ];
    const INVALID_ROUTES = ["/v1/zielonagora/mzk/stops/000/departures"];

    test.each(VALID_ROUTES)("Return 200 OK - %s", (route) => {
      request(app)
        .get(route)
        .then((res) => expect(res.statusCode).toBe(200));
    });

    test.each(INVALID_ROUTES)(
      "Return 500 Internal Server Error - %s",
      (route) => {
        request(app)
          .get(route)
          .then((res) => expect(res.statusCode).toBe(500));
      }
    );
  });
});
