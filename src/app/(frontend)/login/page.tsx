import { headers as getHeaders } from 'next/headers'
import config from '@payload-config'
import { getPayload } from 'payload'

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

        <div className="flex w-full">
            {user &&
                <div className="flex flex-col justify-center w-full">
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
                </div>
            }
            {!user &&
                <div className="gap-5 flex flex-col">
                    <h2>Not Logged In!</h2>
                    <a onClick={() => createUser()}><p>Create an Account</p></a>

                </div>
            }
        </div>
    )
}