export function ProfileUserInfo({ title, text, link=null }) {
    return (
        <div className="w-full flex items-center justify-between">
            <p className="text-[16px] lg:text-lg font-medium">{ title }</p>
            {
                link ?
                    <a className="text-[16px] lg:text-lg" href={link}>{ text }</a>
                :
                    <p className="text-[16px] lg:text-lg">{ text }</p>
            }
        </div>
    );
}