export function Avatar({ imgSrc, imgAlt, width }) {
    return (
        <img src={imgSrc} alt={imgAlt} className={`w-${width} h-auto aspect-square rounded-full mx-auto`}/>
    );
}