import { XMLParser } from "fast-xml-parser";
import { zGetVehicleListResponse } from "../schema/zg/get-vehicle-list";

const ZG_BASE_URL = "https://rj.mzk.zgora.pl/Routes/" as const;

export const EXTERNAL_ENDPOINTS = {
	ZG_GET_VEHICLES_LIST: {
		BASE_URL: ZG_BASE_URL,
		ENDPOINT: "CNR_GetVehicles?r=%all%",
		REFRESH_INTERVAL_SECONDS: 10,
		xmlParser: new XMLParser({
			ignoreAttributes: true,
			parseTagValue: true,
			trimValues: true,
			isArray: (tagName) => tagName === "p",
			processEntities: true,
			htmlEntities: true,
		}),
		schema: zGetVehicleListResponse,
	},
} as const;
