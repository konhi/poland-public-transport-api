<div align="center">
<a href="#">
    <img src="https://user-images.githubusercontent.com/61631665/160162690-04047e63-f704-44f7-9d30-7e9685236ba1.png" alt="Logo">
</a>



<br>
<h1 align="center">🚌 Poland's Public Transport API</h1>

  <p align="center">
      <b>Simple</b>, <b>open</b> and <b>community</b>-maintained REST API you can use in your project <b>limitlessly.</b>
    <br>
    <br>
    <a href="#-lets-talk">💬 Let's talk</a>
    ·
    <a href="https://github.com/konhi/poland-public-transport-api/blob/main/CONTRIBUTING.MD">🖥 Contribute & Use</a>
    ·
    <a href="https://github.com/konhi/poland-public-transport-api/issues">✨ Request Feature</a>
  </p>
</div>

## 🌐 Sources

| Status | Version | City | Notes |
|--------|---------|------|--------|
| ✅ | v1 | Zielona Góra | Scrapes directly from [mzk.zgora.pl](https://mzk.zgora.pl) |
| ✅ | v1 | Gorzów Wielkopolski | Scrapes directly from [mzk-gorzow.com.pl](https://mzk-gorzow.com.pl/) |
| 🔁 | - | Wrocław | [Issue](https://github.com/LiarPrincess/Wroclive-server/issues/8) and [other one](https://github.com/konhi/poland-public-transport-api/issues/12) |
| 🔁 | - | Bieława | [Issue](https://github.com/konhi/poland-public-transport-api/issues/9) |
| 🔁 | - | Kalisz | [Issue](https://github.com/konhi/poland-public-transport-api/issues/8) |

Not found what you're looking for?  [**Contribute new providers »**](https://github.com/konhi/poland-public-transport-api/blob/main/CONTRIBUTING.MD)

## ✨ Features
- **🔌 CORS:** fetch data in your cool webapp
- **🥰 Fully Free:** no keys and ratelimits, open-source - you can deploy your own instance
- **💨 Fast**: headers-based caching
- **🔒 Safe**: validates data to check external servers

## 💖 Instances
This project is **proudly powered by Cloudflare Workers**. You can deploy your own instance for **free**, **100k requests/day**.

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/konhi/poland-public-transport-api)

You can also use these **public instances**:
- [https://poland-public-transport.konhi.workers.dev/](https://poland-public-transport.konhi.workers.dev/)

## 🔌 Routes
### Zielona Góra
- [/v1/zielonagora/mzk/stops](https://poland-public-transport.konhi.workers.dev/v1/zielonagora/mzk/stops)
- [/v1/zielonagora/mzk/vehicles](https://poland-public-transport.konhi.workers.dev/v1/zielonagora/mzk/vehicles)
- [/v1/zielonagora/mzk/infos](https://poland-public-transport.konhi.workers.dev/v1/zielonagora/mzk/stops)
- [/v1/zielonagora/mzk/stops/:stop_id/departures](https://poland-public-transport.konhi.workers.dev/v1/zielonagora/mzk/stops/75/departures)
- [/v1/zielonagora/mzk/stops/:stop_id/info](https://poland-public-transport.konhi.workers.dev/v1/zielonagora/mzk/stops/75/info)
### Gorzów Wielkopolski
- [/v1/gorzow/mzk/stops](https://poland-public-transport.konhi.workers.dev/v1/gorzow/mzk/stops)
- [/v1/gorzow/mzk/vehicles](https://poland-public-transport.konhi.workers.dev/v1/gorzow/mzk/vehicles)
- [/v1/gorzow/mzk/infos](https://poland-public-transport.konhi.workers.dev/v1/gorzow/mzk/infos)
- [/v1/gorzow/mzk/stops/:stop_id/departures](https://poland-public-transport.konhi.workers.dev/v1/gorzow/mzk/stops/000000001074/departures)
- [/v1/gorzow/mzk/stops/:stop_id/info](https://poland-public-transport.konhi.workers.dev/v1/gorzow/mzk/stops/000000001074/info)

## 🌌 Used by
Does your project use this API? Feel free to **add it there!**

- [Przystanek MZK Zielona Góra](https://github.com/Wybranowsky/przystanek-mzk)

## 💬 Let's talk!
- [konhi](https://github.com/konhi) - **Jan Szymański**: [<hello.konhi@gmail.com>](mailto:hello.konhi@gmail.com) · [@konhi_](https://twitter.com/konhi_) · [konhi#1588](https://discord.com) (he/him)

## 🕶 Related
- [Przyjazdy.pl GTFS Feeds](https://przyjazdy.pl/gtfs)
- [MKuran GTFS Feeds](https://mkuran.pl/gtfs/)
- [github.com/public-transport](https://github.com/public-transport)
  - [transport.rest](https://transport.rest)
  - [eu.data.public-transport.earth/](https://eu.data.public-transport.earth/)
- [Polish National Access Point Datasets](https://dane.gov.pl/pl/dataset/1739,krajowy-punkt-dostepowy-kpd-multimodalne-usugi-informacji-o-podrozach)
- [Transitfeeds - An extensive archive of public transit data](https://transitfeeds.com/)
- [Commercial alternative](https://jakdojade.pl/public/pages/api/rest_xml.html)

## 📜 License

- Distributed under the MIT License. See [`LICENSE.txt`](https://github.com/konhi/poland-public-transport-api/blob/main/LICENSE) for more information.
- Check [attributions!](https://github.com/konhi/poland-public-transport-api/blob/main/ATTRIBUTIONS.md)
