import { Link } from "react-router";
import { Container } from "../layout/Container";

export function NotFound() {
    return (
        <Container>
            <div className="h-full flex flex-col items-center gap-2">
                <div className="text-center">
                    <h1 className="text-[clamp(184px,30vw,328px)] font-black tracking-tight">404</h1>
                    <p className="text-xl lg:text-2xl">The page you're looking for doesn't exist.</p>
                </div>
                <div className="w-fit relative overflow-hidden">
                    <Link to="/"
                        className="text-lg after:content-[''] after:w-full after:border after:border-zinc-900 after:transition-[width] after:duration-700 after:absolute after:bottom-0 after:left-0 after:rounded-full lg:after:w-0 lg:after:-left-2 lg:hover:after:w-[calc(100%+100px)]"
                    >
                        Return to Homepage
                    </Link>
                </div>
            </div>
        </Container>
    );
}