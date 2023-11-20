import { useState } from "react";
import { toast } from "react-toastify";

const CurrencyConverter = () => {
    const [result, setResult] = useState(0);
    const [currencyData, setCurrencyData] = useState({
        int: 0,
        de: "EUR",
        a: "USD",

    });

    const handleCalc = async (e: any) => {
        e.preventDefault();
        try {
            await fetch(`https://v6.exchangerate-api.com/v6/a053644275ddc07f8f857865/latest/${currencyData?.de}`)
                .then((res) => res.json())
                .then((data) => {
                    const rate = data.conversion_rates[currencyData?.a];
                    setResult(currencyData?.int * rate)
                });

        } catch (error: any) {
            toast.error(error.message)
        }
    };



    return (
        <div className="bg-banner rounded-t-lg overflow-hidden border-t border-l border-r border-gray-400 p-4 px-3 py-10 flex justify-center">
            <div className="w-full max-w-xs">
                <h1 className="text-center text-4xl mb-6">Cambio de divisas</h1>
                <form

                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                >
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="amount"
                            >
                                Importe:
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="amount"
                                type="number"
                                placeholder="introduzca un valor"
                                onChange={(e: any) => setCurrencyData({ ...currencyData, int: e.target.value })}

                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="from"
                            >
                                De:
                            </label>
                            <select
                                onChange={(e: any) => setCurrencyData({ ...currencyData, de: e.target.value })}
                                id="currency-one"
                                defaultValue={"EUR"}
                            >
                                <option value="AED">AED</option>
                                <option value="ARS">ARS</option>
                                <option value="AUD">AUD</option>
                                <option value="BGN">BGN</option>
                                <option value="BRL">BRL</option>
                                <option value="BSD">BSD</option>
                                <option value="CAD">CAD</option>
                                <option value="CHF">CHF</option>
                                <option value="CLP">CLP</option>
                                <option value="CNY">CNY</option>
                                <option value="COP">COP</option>
                                <option value="CZK">CZK</option>
                                <option value="DKK">DKK</option>
                                <option value="DOP">DOP</option>
                                <option value="EGP">EGP</option>
                                <option value="EUR">EUR</option>
                                <option value="FJD">FJD</option>
                                <option value="GBP">GBP</option>
                                <option value="GTQ">GTQ</option>
                                <option value="HKD">HKD</option>
                                <option value="HRK">HRK</option>
                                <option value="HUF">HUF</option>
                                <option value="IDR">IDR</option>
                                <option value="ILS">ILS</option>
                                <option value="INR">INR</option>
                                <option value="ISK">ISK</option>
                                <option value="JPY">JPY</option>
                                <option value="KRW">KRW</option>
                                <option value="KZT">KZT</option>
                                <option value="MXN">MXN</option>
                                <option value="MYR">MYR</option>
                                <option value="NOK">NOK</option>
                                <option value="NZD">NZD</option>
                                <option value="PAB">PAB</option>
                                <option value="PEN">PEN</option>
                                <option value="PHP">PHP</option>
                                <option value="PKR">PKR</option>
                                <option value="PLN">PLN</option>
                                <option value="PYG">PYG</option>
                                <option value="RON">RON</option>
                                <option value="RUB">RUB</option>
                                <option value="SAR">SAR</option>
                                <option value="SEK">SEK</option>
                                <option value="SGD">SGD</option>
                                <option value="THB">THB</option>
                                <option value="TRY">TRY</option>
                                <option value="TWD">TWD</option>
                                <option value="UAH">UAH</option>
                                <option value="USD">USD</option>
                                <option value="UYU">UYU</option>
                                <option value="VND">VND</option>
                                <option value="ZAR">ZAR</option>
                            </select>
                        </div>

                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="to"
                            >
                                A:
                            </label>
                            <select
                                onChange={(e: any) => setCurrencyData({ ...currencyData, a: e.target.value })}
                                id="currency-two"
                                defaultValue={"USD"}
                            >
                                <option value="AED">AED</option>
                                <option value="ARS">ARS</option>
                                <option value="AUD">AUD</option>
                                <option value="BGN">BGN</option>
                                <option value="BRL">BRL</option>
                                <option value="BSD">BSD</option>
                                <option value="CAD">CAD</option>
                                <option value="CHF">CHF</option>
                                <option value="CLP">CLP</option>
                                <option value="CNY">CNY</option>
                                <option value="COP">COP</option>
                                <option value="CZK">CZK</option>
                                <option value="DKK">DKK</option>
                                <option value="DOP">DOP</option>
                                <option value="EGP">EGP</option>
                                <option value="EUR">EUR</option>
                                <option value="FJD">FJD</option>
                                <option value="GBP">GBP</option>
                                <option value="GTQ">GTQ</option>
                                <option value="HKD">HKD</option>
                                <option value="HRK">HRK</option>
                                <option value="HUF">HUF</option>
                                <option value="IDR">IDR</option>
                                <option value="ILS">ILS</option>
                                <option value="INR">INR</option>
                                <option value="ISK">ISK</option>
                                <option value="JPY">JPY</option>
                                <option value="KRW">KRW</option>
                                <option value="KZT">KZT</option>
                                <option value="MXN">MXN</option>
                                <option value="MYR">MYR</option>
                                <option value="NOK">NOK</option>
                                <option value="NZD">NZD</option>
                                <option value="PAB">PAB</option>
                                <option value="PEN">PEN</option>
                                <option value="PHP">PHP</option>
                                <option value="PKR">PKR</option>
                                <option value="PLN">PLN</option>
                                <option value="PYG">PYG</option>
                                <option value="RON">RON</option>
                                <option value="RUB">RUB</option>
                                <option value="SAR">SAR</option>
                                <option value="SEK">SEK</option>
                                <option value="SGD">SGD</option>
                                <option value="THB">THB</option>
                                <option value="TRY">TRY</option>
                                <option value="TWD">TWD</option>
                                <option value="UAH">UAH</option>
                                <option value="USD">USD</option>
                                <option value="UYU">UYU</option>
                                <option value="VND">VND</option>
                                <option value="ZAR">ZAR</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <button
                                onClick={handleCalc}
                                className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Convertir
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="result w-full px-3 mb-6 md:mb-0">
                            <h2 className="text-center text-5xl">{result.toFixed(2)}</h2>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CurrencyConverter;