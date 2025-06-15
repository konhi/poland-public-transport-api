import { Hono } from "hono";
import { fetcher } from "./utils/fetch";

const app = new Hono();

app.get("/zg/vehicle-list", async (c) => {
	const response = await fetcher({
		endpoint: "ZG_GET_VEHICLES_LIST",
	});

	// 0 - vehicleId (344)
	// 9 - x (15.4851)
	// 10 - y (51.928)
	//

	/**
NrRadia: data[0],
                Nb: data[1],
                NumerLini: data[2],
                WarTrasy: data[3],
                Kierunek: data[4],
                IdKursu: data[5],
                LpPrzyst: data[6],
                DrogaPlan: data[7],
                DrogaWyko: data[8],
                Dlugosc: data[9],
                Szerokosc: data[10],
                PrevDlugosc: data[11],
                PrevSzerokosc: data[12],
                Odchylenie: data[13],
                OdchylenieStr: data[14],
                Stan: data[15],
                PlanGodzRozp: data[16],
                NastIdKursu: data[17],
                NastPlanGodzRozp: data[18],
                NastNumLini: data[19],
                NastWarTrasy: data[20],
                NastKierunek: data[21],
                IleSekDoOdjazdu: data[22],
                TypPojazdu: data[23],
                Cechy: data[24], //nie używane, są głupoty w flagach
                KoncowyPrzystanek: data[26],
                PoczatkowyPrzystanek: data[27],
                Wektor: data.length > 27 ? data[27] : -1,
                NapedElektryczny: data.length > 28 ? data[28] == 1 ? true : false : false,
   */

	return c.json({
		vehicleList: response.VL.p.map((vehicle) => ({
			vehicleId: vehicle[0],
			lineNumber: vehicle[2].trim(),
			routeVariant: vehicle[3],
			direction: vehicle[4],
			courseId: vehicle[5],
			stopSequence: vehicle[6],
			plannedRoute: vehicle[7],
			actualRoute: vehicle[8],
			location: {
				x: vehicle[9],
				y: vehicle[10],
			},
			previousLocation: {
				x: vehicle[11],
				y: vehicle[12],
			},
			deviation: vehicle[13],
			deviationDirection: vehicle[14],
			status: vehicle[15],
			plannedStartTime: vehicle[16],
			nextCourseId: vehicle[17],
			nextPlannedStartTime: vehicle[18],
			nextLineNumber: vehicle[19],
			nextRouteVariant: vehicle[20],
			nextDirection: vehicle[21],
			secondsToDeparture: vehicle[22],
			vehicleType: vehicle[23],
			vector: vehicle.length > 27 ? vehicle[27] : -1,
			isElectric: vehicle.length > 28 ? vehicle[28] === 1 : false,
			finalStop: vehicle[25],
			initialStop: vehicle[26],
		})),
	});
});

export default app;
