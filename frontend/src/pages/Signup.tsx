import { Quote } from "../components/Quote"
import { Auth } from "../components/Auth"

export const Signup = () => {
    return (
        <>
        <div className="grid-cols-2 grid gap-4">
        <div><Auth type="signup" /></div>
            <div className=""><Quote /></div>
            
        </div>
        </>
    );
}
