'use client'
import { logoutAction } from './logoutAction';

export default function LogoutForm() {

    return <button onClick={() => logoutAction()} className="text-white border border-white rounded p-2">Log Out</button>
}