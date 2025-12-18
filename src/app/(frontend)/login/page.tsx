import { headers as getHeaders } from 'next/headers'
import config from '@payload-config'
import { getPayload } from 'payload'
import LoginForm from './loginForm'
import LogoutForm from './logoutForm'

export default async function LoginPage() {
    const payload = await getPayload({ config })
    const headers = await getHeaders()

    const { user, permissions } = await payload.auth({ headers })

    async function createUser() {
        // try {
        //     const newUser = await payload.create({
        //         collection: 'users',

        //     })
        // }
    }

    return (

        <div className="flex justify-center !p-[20px] w-full">
            {user &&
                <div className="flex flex-col justify-center">
                    <div>
                        <h2>Logged In!</h2>
                    </div>
                    <div>
                        Email: {user.email}
                    </div>
                    <div>
                        Name: {user.name}
                    </div>
                    <div>
                        Id: {user.id}
                    </div>
                    <LogoutForm />
                </div>
            }
            {!user &&
                <div className="gap-5 flex flex-col">
                    <h2>Not Logged In!</h2>
                    <LoginForm />
                    <a><p className="text-center">Create an Account</p></a>

                </div>
            }
        </div>
    )
}