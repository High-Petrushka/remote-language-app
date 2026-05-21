export function Hero({ children, level }) {
    let hero;
    switch (level) {
        case 1:
            hero = <h1 className="text-[clamp(48px,5vw,64px)] font-bold">{ children }</h1>
            break;
        case 2:
            hero = <h2 className="text-[clamp(44px,5vw,56px)] font-bold leading-[1.2]">{ children }</h2>
            break
        case 3:
            hero = <h3 className="text-[clamp(40px,5vw,48px)] font-semibold">{ children }</h3>
            break
        case 4:
            hero = <h4 className="text-[clamp(36px,5vw,40px)] font-semibold">{ children }</h4>
            break
        case 5:
            hero = <h5 className="text-[32px] font-semibold leading-[1.1] line-clamp-2">{ children }</h5>
            break
        case 6:
            hero = <h6 className="text-[24px] font-semibold">{ children }</h6>
            break
    }

    return hero;
}