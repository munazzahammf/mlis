import {Form, Input, Modal, Select} from "antd";
import {Option} from "antd/es/mentions";
import React from "react";
import {ApiAddPatient} from "../../services/patient.ts";
import {Patient} from "../../types/patient";

type PatientFormProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    onSubmit: () => void;
}

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

export default function PatientForm(props:PatientFormProps) {
    const [titles, setTitles] = React.useState<string[]>([]);
    const [form] = Form.useForm<Patient>();
    
    const updateTitlesList = () => {
        const gender: "MALE" | "FEMALE" = form.getFieldValue("gender");
        
        const currentTitles = gender ? titleOptions[gender] : [];
        setTitles(currentTitles);
    }
    
    const onFormSubmit = () => {
        form
            .validateFields()
            .then((values) => {
                props.setOpen(false);
                ApiAddPatient(values)
                .then(() => {
                    props.onSubmit();
                })
                .catch(error => {
                    console.log(error);
                })
            })
    }
    
    const onCancel = () => {
        form.resetFields();
        props.setOpen(false);
    }
    
    return (
        <Modal
            title="Add Patient"
            open={props.open}
            onOk={onFormSubmit}
            onCancel={onCancel}
        >
            <Form
                layout="vertical"
                form={form}
            >
                <Form.Item
                    name="first_name"
                    rules={[{ required: true, message: 'First Name of Patient Is Required' }]}
                    label="First Name"
                >
                    <Input size="large" />
                </Form.Item>
                <Form.Item
                    name="last_name"
                    rules={[{ required: true, message: 'Last Name of Patient Is Required' }]}
                    label="Last Name"
                >
                    <Input size="large" />
                </Form.Item>
                <Form.Item
                    name="gender"
                    rules={[{ required: true, message: 'Gender Of Patient Is Required' }]}
                    label="Gender"
                    >
                    <Select
                        size="large"
                        onChange={updateTitlesList}
                        placeholder="Gender of the Patient"
                    >
                        <Option value=""></Option>
                        <Option value="MALE">MALE</Option>
                        <Option value="FEMALE">FEMALE</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="title"
                    rules={[{ required: true, message: 'Title of Patient Is Required' }]}
                    label="Title"
                    >
                    <Select
                        size="large"
                        placeholder="Title of Patient"
                    >
                        {titles.map((item) => (<Option key={item} value={item}>{item}</Option>))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="phone"
                    rules={[{ required: true, message: 'Phone Number of Patient Is Required' }]}
                    label="Phone Number"
                    >
                    <Input
                        size="large"
                        placeholder="947xxxxxxxx"
                    />
                </Form.Item>
                <Form.Item
                    name="nic"
                    label="NIC No."
                >
                    <Input size="large" />
                </Form.Item>
                <Form.Item
                    name="birth_date"
                    rules={[{ required: true, message: 'Birth Date of Patient Is Required' }]}
                    label="Birth Date"
                    >
                    <Input
                        size="large"
                        placeholder="YYYY-MM-DD"
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}