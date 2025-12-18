'use client'
import { loginAction } from './loginAction';

export default function LoginForm() {

    return (
        <form action={loginAction} className="flex flex-col w-full gap-3">
            <input name="email" type="email" placeholder='email' className="text-black p-1 px-2 rounded" required />
            <input name="password" type="password" placeholder='password' className="text-black p-1 px-2 rounded" required />
            <button type="submit">Log in</button>
        </form>
    );
}