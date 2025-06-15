import { EXTERNAL_ENDPOINTS } from "./external-endpoints";
import wretch from "wretch";

export const fetcher = async ({
	endpoint,
}: { endpoint: keyof typeof EXTERNAL_ENDPOINTS }) => {
	const text = await wretch(`
		${EXTERNAL_ENDPOINTS[endpoint].BASE_URL}
		${EXTERNAL_ENDPOINTS[endpoint].ENDPOINT}`,
		{
			headers: {
				"User-Agent":
					"Non-commercial Poland Public Transport API; Contact at: https://github.com/konhi/poland-public-transport-api",
				cf: {
					cacheEverything: true,
					cacheTtl: EXTERNAL_ENDPOINTS[endpoint].REFRESH_INTERVAL_SECONDS,
				},
			},
		},
	).get().text();

	const json = await EXTERNAL_ENDPOINTS[endpoint].xmlParser.parse(text);

	return EXTERNAL_ENDPOINTS[endpoint].schema.parse(json);
};
