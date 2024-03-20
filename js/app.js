(async () => {
    const generateData = () => {
        const startDate = new Date('2010-01-01').getTime();
        const endDate = new Date().getTime();
        const newData = [];

        for (let date = startDate; date <= endDate; date += 24 * 60 * 60 * 1000) {
            const lastRate = newData[newData.length - 1] ? newData[newData.length - 1][1] : 1;
            const randomChange = (Math.random() - 0.5) * 0.01;
            const newRate = lastRate + randomChange;
            newData.push([date, newRate]);
        }

        return newData;
    };
    const chart = Highcharts.stockChart('chart', {
        chart: {
            zoomType: 'x',
            type: 'line',
            events: {
                load: function () {
                    const series = this.series[0];
                    setInterval(function () {
                        const chart = Highcharts.charts[0];
                        const series = chart.series[0];
                        const lastPoint = series.data[series.data.length - 1];
                        const lastDateTimestamp = lastPoint.x;
                        const lastRate = lastPoint.y;
                        const newDate = lastDateTimestamp + 24 * 60 * 60 * 1000
                        const randomChange = (Math.random() - 0.5) * 0.01;
                        const newRate = lastRate + randomChange;
                        series.addPoint([newDate, newRate], true, true);
                    }, 3000);
                }
            }
        },
        title: {
            text: 'EUR/USD'
        },
        xAxis: {
            type: 'datetime',
            minRange: 24 * 3600 * 1000,
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'Обменный курс'
            }
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },
        series: [{
            type: 'area',
            name: 'EUR/USD',
            data: generateData()
        },]
    });

    document.getElementById('btn-eur-usd').addEventListener('click', function () {
        chart.series[0].setData(generateData());
        chart.series[0].update({name: 'EUR/USD'});
        chart.title.update({text: 'EUR/USD'});
    });
        document.getElementById('btn-eur-rub').addEventListener('click', function () {
        chart.series[0].setData(generateData());
        chart.series[0].update({name: 'EUR/RUB'});
        chart.title.update({text: 'EUR/RUB'});
    });

    document.getElementById('btn-usd-rub').addEventListener('click', function () {
        chart.series[0].setData(generateData());
        chart.series[0].update({name: 'USD/RUB'});
        chart.title.update({text: 'USD/RUB'});
    });
        document.getElementById('btn-usd-eur').addEventListener('click', function () {
        chart.series[0].setData(generateData());
        chart.series[0].update({name: 'USD/EUR'});
        chart.title.update({text: 'USD/EUR'});
    });

    document.getElementById('btn-rub-usd').addEventListener('click', function () {
        chart.series[0].setData(generateData());
        chart.series[0].update({name: 'RUB/USD'});
        chart.title.update({text: 'RUB/USD'});
    });
        document.getElementById('btn-rub-eur').addEventListener('click', function () {
        chart.series[0].setData(generateData());
        chart.series[0].update({name: 'RUB/EUR'});
        chart.title.update({text: 'RUB/EUR'});
    });

    // График 1 - Японские свечи
    Highcharts.stockChart('chart1', {
        rangeSelector: {
            selected: 1
        },
        title: {
            text: 'Курс евро к доллару'
        },
        series: [{
            type: 'candlestick',
            name: 'AAPL Stock Price',
        data: [
            [1614104400000, 1.12, 1.14, 1.03, 1.05],
            [1614190800000, 1.13, 1.22, 1.11, 1.20],
            [1614277200000, 1.19, 1.19, 1.12, 1.15],
            [1614363600000, 1.15, 1.18, 1.15, 1.17],
            [1614450000000, 1.16, 1.19, 1.14, 1.17],
            [1614536400000, 1.17, 1.27, 1.15, 1.24],
        ]
        }],
        plotOptions: {
            candlestick: {
                color: 'red',
                upColor: 'green',
                lineColor: 'black',
                upLineColor: 'black'
            }
        }
    });

    // График 2 - Линейный график
    Highcharts.chart('chart2', {
        title: {
            text: 'Десятилетия отсутствия инвестиций дают о себе знать'
        },
        series: [{
            name: 'Данные 1',
            data: [10, 30, 15, 40, 50]
        }, {
            name: 'Данные 2',
            data: [5, 15, 25, 35, 40]
        }]
    });

    // График 3 - Столбчатая диаграмма
    Highcharts.chart('chart3', {
        title: {
            text: 'USD в EUR Средние объемы торгов'
        },
        xAxis: {
            categories: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май']
        },
        series: [{
            name: 'Данные',
            data: [100, 200, 150, 300, 250],
            type: 'column'
        }]
    });



    // Функция для загрузки и отображения курсов валют
    async function loadCurrencyRates(baseCurrency) {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
        const data = await response.json();
        const rates = data.rates;
        const currencyContainer = document.getElementById("currency-container");
        currencyContainer.innerHTML = "";

        for (const [currency, rate] of Object.entries(rates)) {
            const currencyElement = document.createElement("div");
            currencyElement.classList.add("currency");
            currencyElement.innerHTML = `
                <span>${currency}</span>
                <span>${rate}</span>
            `;
            currencyContainer.appendChild(currencyElement);
        }
    }

    // По умолчанию загружаем курсы для USD
    await loadCurrencyRates("USD");

    // Функция для обработки нажатия на кнопки выбора валюты
    document.getElementById("btnRUB").addEventListener("click", async () => {
        await loadCurrencyRates("RUB");
    });

    document.getElementById("btnUSD").addEventListener("click", async () => {
        await loadCurrencyRates("USD");
    });

    document.getElementById("btnEUR").addEventListener("click", async () => {
        await loadCurrencyRates("EUR");
    });

    // Функция для фильтрации курсов валют по введенному пользователем запросу
    document.getElementById("searchInput").addEventListener("input", function() {
        const searchTerm = this.value.toLowerCase();
        const currencies = document.querySelectorAll(".currency");

        for (const currency of currencies) {
            const textContent = currency.textContent.toLowerCase();
            if (textContent.includes(searchTerm)) {
                currency.style.display = "block";
            } else {
                currency.style.display = "none";
            }
        }
    });



    const newsData = [
        {"title": "Все о системе «Золотая Корона»: где и как работает, как сделать перевод 18 фев, 10:00 РБК Банки", "content": "Как отправить перевод без открытия счета внутри страны и за границу через платежную систему «Золотая Корона» и где получить деньги, разбирались «РБК Инвестиции»", "image": "images/zol_cor.jpeg"},
        {"title": "Девальвация: что это и грозит ли она рублю в 2024 году", "content": "Рассказываем простыми словами, что такое девальвация, чем она опасна, как влияет на кредиты и ипотеку и как сохранить сбережения. Эксперты поделились мнениями, стоит ли ждать девальвации в 2024 году", "image": "images/devalv.jpg"},
        {"title": "Курс евро поднялся выше ₽99 впервые со 2 февраля", "content": "Рубль ускорил снижение к евро и доллару. Одной из причин ослабления рубля могло стать возможное сокращение экспортной выручки", "image": "images/kurs_eur.jpeg"},
        {"title": "Курс доллара превысил ₽92 впервые с 9 февраля", "content": "Аналитики отмечают, что рубль малоактивен в преддверии заседания Центробанка по ключевой ставке. Российскую валюту, вероятно, поддержит относительно жесткая денежно-кредитная политика", "image": "images/kurs_usd.jpeg"},
        {"title": "Доллар к иене достиг максимума с ноября из-за данных по инфляции США", "content": "Курс доллара превысил 150 иен впервые с ноября после выхода данных о росте потребительских цен в США выше прогнозов. Перспектива более длительного периода высоких ставок в Америке делает долларовые активы привлекательнее", "image": "images/kurs_ien.jpeg"}
    ];

    const newsItems = document.querySelectorAll('.news-item');

    // Заполнение новостей данными
    newsData.forEach((item, index) => {
        if (index < newsItems.length) {
            const newsItem = newsItems[index];
            const img = document.createElement('img');
            img.src = item.image;
            const title = document.createElement('h3');
            title.textContent = item.title;
            const content = document.createElement('p');
            content.textContent = item.content;
            newsItem.innerHTML = ''; // Очистить содержимое элемента
            newsItem.appendChild(title);
            newsItem.appendChild(img);
            newsItem.appendChild(content);
        }
    });



    // Прокрутка информации о сайте
    const tape = document.querySelector('.tape');
    const arrowLeft = document.querySelector('.arrow-left');
    const arrowRight = document.querySelector('.arrow-right');

    let scrollAmount = 0;
    const itemWidth = document.querySelector('.inform-item').offsetWidth + 10;

    arrowLeft.addEventListener('click', () => {
        scrollAmount -= itemWidth * 4;
        if (scrollAmount < 0) {
            scrollAmount = 0;
        }
        tape.scrollTo({
            top: 0,
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    arrowRight.addEventListener('click', () => {
        const maxScroll = tape.scrollWidth - tape.clientWidth;
        scrollAmount += itemWidth * 4;
        if (scrollAmount > maxScroll) {
            scrollAmount = maxScroll;
        }
        tape.scrollTo({
            top: 0,
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

})();
