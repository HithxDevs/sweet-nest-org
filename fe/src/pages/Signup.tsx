import { Button } from "../components/Button";

export const Signup = () => {
 return (
    <div className="bg-gray-600 w-full h-screen flex items-center justify-center">
        <div className="bg-white br-4 flex flex-col items-center justify-center lg">
            <h1 className="text-indigo lg">SignUp</h1>
            <form className="flex flex-col p-4">
                <label className="text-gray-700">Username</label>
                <input
                    type="text"
                    className="border border-gray-300 p-2 rounded mb-4"
                    placeholder="Enter your username"
                />
                <label className="text-gray-700">Email</label>
                <input
                    type="email"
                    className="border border-gray-300 p-2 rounded mb-4"
                    placeholder="Enter your email"
                />
                <label className="text-gray-700">Password</label>
                <input
                    type="password"
                    className="border border-gray-300 p-2 rounded mb-4"
                    placeholder="Enter your password"
                />
                <Button variant="primary" size="sm" text="Submit"/>
            </form>
        </div>
    </div>
 );


}