import {ReactNode, useState} from "react";
import {Avatar, Button, Image, Layout, Menu, theme} from "antd";
import Sider from "antd/es/layout/Sider";
import {
    FileOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UsergroupAddOutlined,
    UserOutlined,
} from "@ant-design/icons";
import {Content, Header} from "antd/es/layout/layout";
import {Navigate, Outlet, useNavigate} from "react-router-dom";
import useAuthStore from "../stores/AuthStore.ts";
import styled from "styled-components";

const StyledHeader = styled(Header)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
`

export function DashboardLayout(): ReactNode {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken();

    const navigate = useNavigate();

    const onMenuItemSelected = (key: string) => {
        navigate(key)
    }
    
    const isAuthenticated = useAuthStore(state => state.isAuthenticated)
    
    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    return (
        <Layout style={{
            height: "100vh"
        }}>
            <Sider theme="light" collapsedWidth={0} breakpoint={"lg"} trigger={null} collapsed={collapsed} onCollapse={(collapsed) => setCollapsed(collapsed)} collapsible>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-evenly"
                    }}
                >
                    <Image src="src/assets/logo.png" height={80} />
                    <div style={{
                        fontWeight: 'bold',
                        color: '#007AC2',
                        fontSize: '1.5rem'
                    }}>LABS</div>
                </div>
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    onSelect={e => onMenuItemSelected(e.key)}
                    items={[
                        {
                            key: '/reports',
                            icon: <FileOutlined />,
                            label: 'Reports',
                        },
                        {
                            key: '/users',
                            icon: <UserOutlined />,
                            label: 'User Management',
                        },
                        {
                            key: '/patients',
                            icon: <UsergroupAddOutlined />,
                            label: 'Patients',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <StyledHeader style={{background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <Avatar />
                </StyledHeader>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}