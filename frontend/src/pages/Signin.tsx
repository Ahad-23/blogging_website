import { Quote } from "../components/Quote"
import { Auth } from "../components/Auth"

export const Signin = () => {
    return (
        <>
        <div className="grid-cols-2 grid gap-4">
        <div><Auth type="signin" /></div>
            <div><Quote /></div>
            
        </div>
        </>
    );
}