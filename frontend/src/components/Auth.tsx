import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { signupInput } from "@ahad_shaikh/medium_project_common";

export const Auth = ({type}: { type: "signup" | "signin"}) => {
    const [postInputs,setpostInputs]=useState<signupInput>({
        username:"",
        password:"",
        email:"",
        name:""
    })
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                <div className="text-3xl font-extrabold">
                   {type==="signup"?"Create an account":""}
                </div>
                <div className="text-slate-400 ">
                    {type==="signup"?"Already have an account?":"Dont have an account?"}
                    <Link className="pl-2 underline" to={type==="signup"?"/signin":"/signup"}>{type==="signup"?"Signin":"Signup"}</Link>
                </div>
            </div>
            <div className="pt-8">
            <LabelledInput label="Username" placeholder="clumsypotato69" onChange={(e)=>{
                setpostInputs({
                    ...postInputs,
                    username:e.target.value
                })
            }}/>
            <LabelledInput label="Password" type={"password"} placeholder="******" onChange={(e)=>{
                setpostInputs({
                    ...postInputs,
                    password:e.target.value
                })
            }}/>
            <LabelledInput label="Email" placeholder="webroke@gmail.com" onChange={(e)=>{
                setpostInputs({
                    ...postInputs,
                    email:e.target.value
                })
            }}/>
             <LabelledInput label="Name" placeholder="Ahad Shaikh" onChange={(e)=>{
                setpostInputs({
                    ...postInputs,
                    name:e.target.value
                })
            }}/>
            <button type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" >{type==="signup" ? "Signup": "Signin"}</button>
            </div>

            </div>
        </div>
    </div>


interface LabelledInputType{
    label:string;
    placeholder:string;
    onChange:(e: ChangeEvent<HTMLInputElement>)=>void;
    type?:string
}

function LabelledInput({ label ,placeholder,onChange,type }:LabelledInputType)
    {
return <div>
            <label className="block mb-2 text-sm font-semibold pt-2">{label}</label>
            <input onChange={onChange} type={type || "text"}className="pt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    }
}
