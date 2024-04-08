import {Link, Outlet, createRootRoute} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/router-devtools'
import '../index.css'
import useCurrentUser from "@hooks/useCurrentUser.tsx";

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    const {isExists, user} = useCurrentUser();
    return (
        <>
            <div className="p-2 flex gap-2 text-lg">
                {!isExists && (
                    <Link
                        to="/auth/login"
                        activeProps={{
                            className: 'font-bold',
                        }}
                        activeOptions={{exact: true}}
                    >
                        Login
                    </Link>
                )
                }
                {isExists && <div>Hello {user.email}</div>}
            </div>
            <hr/>
            <Outlet/>
            <TanStackRouterDevtools position="bottom-right"/>
        </>
    )
}
