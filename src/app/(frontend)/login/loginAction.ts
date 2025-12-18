'use server'
import { login } from '@payloadcms/next/auth'
import config from '@payload-config'
import { redirect } from 'next/navigation'

export async function loginAction(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    if (!email || !password) {
        throw new Error('Missing email or password')
    }
    try {
        const res = await login({
            collection: 'users',
            config,
            email,
            password
        });
    } catch {
        console.log("Error occurred when submitting!")
    }
    redirect('/login')
}