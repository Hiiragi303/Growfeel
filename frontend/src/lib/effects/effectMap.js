import { createRain } from "./rain";
import { createThunder } from "./thunder";

export const effectMap = {
    clear: [],
    sunny: [],
    rain: ["rain"],
    thunder: ["rain", "thunder"],
    mist: ["fog"],
    typhoon: ["rain", "wind"],
    rainbow: ["rainbow"],
};

export const effectFactory = {
    rain: createRain,
    thunder: createThunder,
}
