export function Like({ active, handleClick }) {
    let component;

    if (active) {
        component = <img
            src="/assets/hearts/filled-heart.svg"
            alt="Filled heart image"
            className="cursor-pointer"
            onClick={() => handleClick()}
        />
    } else {
        component = <img
            src="/assets/hearts/empty-heart.svg"
            alt="Empty heart image"
            className="cursor-pointer"
            onClick={handleClick}
        />
    }

    return component;
}