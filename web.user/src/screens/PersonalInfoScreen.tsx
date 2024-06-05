import {Button, DatePicker, Form, Input, Select} from "antd";
import {LockOutlined} from "@ant-design/icons";
import {useState} from "react";
import {Option} from "antd/es/mentions";
import {ApiUpdateInfo} from "../services/AuthService.ts";
import useAuthStore from "../stores/AuthStore.ts";
import {useNavigate} from "react-router-dom";

const titleOptions = {
    'MALE': [
        'Mr.',
        'Master.'
    ],
    'FEMALE': [
        'Mrs.',
        'Ms.',
        'Miss.'
    ]
}

export default function PersonalInfoScreen() {
    const [titles, setTitles] = useState<string[]>([]);
    const [form] = Form.useForm();
    const navigate = useNavigate()
    
    const userInfo = useAuthStore(state => state.userInfo)
    const setUserInfo = useAuthStore(state => state.userInfo)

    const updateTitlesList = () => {
        const gender: "MALE" | "FEMALE" = form.getFieldValue("gender");
        
        console.log(gender)

        const currentTitles = gender ? titleOptions[gender] : [];
        setTitles(currentTitles);
    }
    
    const onFormSubmit = (values) => {
        ApiUpdateInfo(values)
        .then(() => {
            setUserInfo({...userInfo, has_personal_details: true })
            navigate("/")
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Add Personal Info</h1>
            <Form
                layout="vertical"
                form={form}
                onFinish={onFormSubmit}
            >
                <Form.Item
                    name="gender"
                    rules={[{ required: true, message: 'Gender Required!' }]}
                    label="GENDER"
                >
                    <Select
                        onChange={updateTitlesList}
                        options={['MALE', 'FEMALE'].map((gender) => ({
                            value: gender,
                            label: gender,
                        }))}
                    />
                </Form.Item>
                <Form.Item
                    name="title"
                    rules={[{ required: true, message: 'Title of Patient Is Required' }]}
                    label="Title"
                >
                    <Select
                        placeholder="Title of Patient"
                        options={titles.map((item) => ({
                            value: item,
                            label: item,
                        }))}
                    />
                </Form.Item>
                <Form.Item
                    name="birth_date"
                    rules={[{ required: true, message: 'Title of Patient Is Required' }]}
                    label="Birth Date"
                >
                    <Input
                        style = {{width: '100%'}}
                        placeholder="YYYY-MM-DD"
                    />
                </Form.Item>
                <Button type="primary" style={{width: '100%'}} htmlType="submit">SUBMIT</Button>
            </Form>
        </div>
    )
}