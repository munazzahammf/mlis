import {Button, Checkbox, Form, Image, Input} from "antd";
import viteSvg from "../assets/react.svg";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {ApiRegisterUser} from "../services/AuthService.ts";
import {Link, useNavigate} from "react-router-dom";

export default function RegisterScreen() {
    const naviage = useNavigate();
    const onFormSubmit = (values) => {
        ApiRegisterUser(values)
            .then((result) => {
                naviage("/login")
            })
            .catch((error) => {

            })
    }

    return (
        <div
            style={{
                padding: '1rem'
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
                onFinish={onFormSubmit}
                layout="vertical"
            >
                <Form.Item
                    name="first_name"
                    rules={[{required: true, message: 'First Name Required!'}]}
                    label="First Name"
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Ex: John"/>
                </Form.Item>
                <Form.Item
                    name="last_name"
                    rules={[{required: true, message: 'Last Name Required!'}]}
                    label="Last Name"
                >
                    <Input placeholder="Ex: Doe"/>
                </Form.Item>
                <Form.Item
                    name="phone"
                    rules={[{required: true, message: 'Contact No Required!'}]}
                    label="Contact No"
                >
                    <Input placeholder="Ex: 94768491234"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{required: true, message: 'Password Required!'}]}
                    prefix={<LockOutlined />}
                    label="Password"
                >
                    <Input.Password placeholder=""/>
                </Form.Item>
                <Form.Item
                    name="confirm_password"
                    rules={[{required: true, message: 'Confirm Password Required!'}]}
                    label="Confirm Password"
                >
                    <Input.Password placeholder=""/>
                </Form.Item>
                <Form.Item>
                    <Button style={{width: '100%'}} type="primary" htmlType="submit" className="login-form-button">
                        Register
                    </Button>
                </Form.Item>
                <div style={{textAlign: "center"}}>Already Have an Account? <br/><Link to="/login">Login Now</Link></div>
            </Form>
        </div>
    )
}