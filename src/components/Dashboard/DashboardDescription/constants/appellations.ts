export const appellations = [
    {
        value:"pm 2.5",
        description:"PM 2.5 is the smallest particles, ranging in size from 0.001 to 2.5 micrometers (µm), found in the air."
    },
    {
        value: "pm 10",
        description:"PM10 is any particulate matter in the air with a diameter of 10 micrometers or less, including smoke, dust, soot, salts, acids and metals"
    },
    {
        value:"UVI",
        description:"indicator characterizing the level of ultraviolet radiation in the spectrum of sunlight. The UV index allows you to assess the danger of ultraviolet radiation from the sun for human skin."
    },
    {
        value:"O3",
        description: "consisting of triatomic O3 molecules, an allotropic modification of oxygen. Under normal conditions - blue gas. The smell is sharp specific. When liquefied, it turns into an indigo liquid. In solid form, it is dark blue, gray, almost black crystals."
    },
    {
        value:"W",
        description:"wind a stream of air that moves near the earth's surface. On Earth, the wind is a stream of air moving mainly in a horizontal direction, on other planets it is a stream of atmospheric gases characteristic of them."
    },
    {
        value:"t",
        description: "temperature is a physical quantity that expresses the hotness of matter or radiation."
    },
    {
        value:"dew",
        description:"Gas dew point temperature (dew point) - the value of the gas temperature at which water vapor contained in an isobarically cooled gas becomes saturated above a flat water surface"
    },
    {
        value:"co",
        description:"a chemical compound that is a non-salt-forming carbon monoxide, consisting of one atom of oxygen and carbon. Under standard conditions, carbon monoxide is a colorless, odorless, toxic gas that is lighter than air."
    },
    {
        value:"no2",
        description:"Nitric oxide (IV) NO₂ is a binary inorganic compound of nitrogen with oxygen. It is a poisonous red-brown gas with a sharp unpleasant odor or a yellowish liquid."
    },
    {
        value:"so2",
        description:"Sulfur oxide (IV) is a compound of sulfur with oxygen of composition SO₂. Under normal conditions, it is a colorless gas with a characteristic pungent odor. It is toxic in high concentrations. It liquefies under pressure at room temperature."
    }
]
export interface AppellationType{
    value:string,
    description:string
}