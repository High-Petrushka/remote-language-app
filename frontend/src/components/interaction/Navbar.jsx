import { Container } from "../layout/Container";
import { NavbarLayout } from "../layout/NavbarLayout";
import { Logo } from "../Typography/Logo";
import { MenuBtn } from "./MenuBtn";

export function Navbar() {
    return (
        <Container>
            <nav className="py-2 border-b border-solid border-zinc-900">
                <NavbarLayout>
                    <MenuBtn handleClick={() => console.log("Clicked!")} />
                    <Logo />
                </NavbarLayout>
            </nav>
        </Container>
    );
}