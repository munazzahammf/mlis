import {Button, Checkbox, Form, Image, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import viteSvg from "./../assets/react.svg"
import {ApiLoginUser} from "../services/AuthService.ts";
import useAuthStore from "../stores/AuthStore.ts";
import http from "../axios.ts";
import {Link, useNavigate} from "react-router-dom";

export default function LoginScreen() {

    const setAuthenticated = useAuthStore(state => state.setAuthenticated)
    const navigate = useNavigate()

    const onFinish = (values) => {
        ApiLoginUser(values)
            .then((res) => {
                http.defaults.headers.common["Authorization"] = `Token ${res.data.token}`;
                setAuthenticated(res.data);
                navigate("/");
            })
            .catch(err => {
                console.log(err);
            })
    }
    
    return (
        <div
            style={{
                padding: "1rem",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
            <Image
                src={viteSvg}
                style={{
                    width: '200px',
                    marginBottom: '2rem',
                    margin: '2rem auto'
                }}
            />
            </div>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Phone Number Required!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Phone Number" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    
                    <a style={{float: 'right'}} className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button style={{width: '100%'}} type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
                    <div style={{textAlign: "center"}}>Or <br/><Link to="/register">Register Now!</Link></div>
            </Form>
        </div>
    )
}