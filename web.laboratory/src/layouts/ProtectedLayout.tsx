import {Link, Navigate, Outlet} from "react-router-dom";
import useAuthStore from "../stores/AuthStore.ts";
import {Avatar, Dropdown, Layout, MenuProps} from "antd";

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <Link to="/login">
                Logout
            </Link>
        ),
    },
];

export const ProtectedLayout = () => {

    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    const userInfo = useAuthStore(state => state.userInfo);

    if (!isAuthenticated) {
        // User is not authenticated, redirect to login
        return <Navigate to="/login" />;
    }

    if (!userInfo.has_personal_details) {
        return <Navigate to="info" />
    }

    // User is authenticated, render the children component
    return (
        <Layout>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: '0rem 1rem',
                    backgroundColor: 'white',
                    borderBottom: '1px solid lightgray',
                }}>
                <h3>Hi, {userInfo.last_name}</h3>
                <Dropdown menu={{ items }} placement="bottom">
                    <Avatar
                        style={{
                            backgroundColor: 'lightblue'
                        }}
                    >
                        {userInfo.first_name[0] +  userInfo.last_name[0]}
                    </Avatar>
                </Dropdown>
            </div>
            <Outlet />
        </Layout>
    )
};
