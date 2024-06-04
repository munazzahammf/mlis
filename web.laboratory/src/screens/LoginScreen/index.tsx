import styles from "./index.module.css";
import {Button, Checkbox, Form, Image, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {ApiLogin} from "../../services/auth.ts";
import http from "../../axios.ts";
import ComponentLayout from "../../layouts/ComponentLayout.tsx";
import {useNavigate} from "react-router-dom";
import useAuthStore from "../../stores/AuthStore.ts";

type FormProps = {
    "username": string;
    "password": string;
    "remember": boolean;
}

export function LoginScreen() {
    const navigate = useNavigate();
    
    const setAuthenticated = useAuthStore(state => state.setAuthenticated)

    const onFinish = (values: FormProps) => {
        ApiLogin(values.username, values.password)
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
            className={styles.container}
        >
        <ComponentLayout>
            <div
                className={styles.logoContainer}
            >
                <Image
                    src="src/assets/logo.png"
                    width={300}
                    preview={false}
                />
            </div>
            <Form
                name="normal_login"
                className={styles.form}
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        size="large"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className={styles.formForgotPassword} href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className={styles.formLoginButton}>
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </ComponentLayout>
        </div>
    );
}