import React, {useEffect, useState} from "react";
import {Button, Form, Input, Modal, Popconfirm, Select, Table} from "antd";
import {ApiDeleteStaffById, ApiGetAllStaff, ApiRegisterNewStaff} from "../../services/staff.ts";
import TopRightButton from "../../components/TopRightButton.tsx";
import {DeleteOutlined, UserAddOutlined} from "@ant-design/icons";
import useAuthStore from "../../stores/AuthStore.ts";

const getColumns = (userId, onDeleteClicked) => [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (_, record) => {
            return `${record.user.first_name} ${record.user.last_name}`;
        }
    },
    {
        title: "username",
        dataIndex: "user",
        key: "user",
        align: "center",
        render: (_, record) => {
            return record.user.username;
        }
    },
    {
        title: "Contact No",
        dataIndex: "phone",
        key: "phone"
    },
    {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: (_, record) => {
            return record.user.is_active ?
                <Popconfirm
                    title={"Sure to Disable the User?"}
                    onConfirm={() => onDeleteClicked(record.user.id, 'true')}
                >
                    <Button danger type="primary" disabled={userId === record.user.id} icon={<DeleteOutlined/>}/>
                </Popconfirm>
                :
                <Button type="primary" style={{backgroundColor: 'orange'}} icon={<UserAddOutlined />} onClick={() => onDeleteClicked(record.user.id, 'false')} />
        }
    }
]

export function StaffManagementScreen() {
    const [staffs, setStaffs] = useState([])
    const [staffRegisterFormOpen, setStaffRegisterFormOpen] = useState(false)
    const [form] = Form.useForm()
    
    const userInfo = useAuthStore(state => state.userInfo)
    
    const fetchStaff = () => {
        ApiGetAllStaff()
            .then(res => {
                setStaffs(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    useEffect(() => {
        fetchStaff()
    },[])
    
    const onFormSubmit = () => {
        form.validateFields()
            .then(values => {
                ApiRegisterNewStaff(values)
                .then(res => {
                    setStaffRegisterFormOpen(false)
                    fetchStaff()
                    form.resetFields()
                })
                    .catch(err => {
                        console.log(err);
                    })
            })
    }
    
    const onUserDeleted = (id: number, disable: string) => {
        ApiDeleteStaffById(id, disable)
            .then(() => {
                fetchStaff()
            })
            .catch(err => {
                console.log(err);
            })
    }
    
    const columns = getColumns(userInfo.id, onUserDeleted)
    
    return (
        <div>
            <TopRightButton
                type="primary"
                onClick={() => setStaffRegisterFormOpen(true)}
            >
                New Staff
            </TopRightButton>
            <Table
                columns={columns}
                dataSource={staffs}
            />
            <Modal
                title="New Staff"
                open={staffRegisterFormOpen}
                onOk={onFormSubmit}
                onCancel={() => {
                    setStaffRegisterFormOpen(false)
                }}
            >
                <Form
                    layout="vertical"
                    form={form}
                    autoComplete="off"
                >
                    <Form.Item
                        name={["user", "first_name"]}
                        rules={[{ required: true, message: 'First Name of Patient Is Required' }]}
                        label="First Name"
                    >
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item
                        name={["user","last_name"]}
                        rules={[{ required: true, message: 'Last Name of Patient Is Required' }]}
                        label="Last Name"
                    >
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item
                        name={["user", "username"]}
                        rules={[{ required: true, message: 'Last Name of Patient Is Required' }]}
                        label="Username"
                    >
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true, message: 'Phone Number of Patient Is Required' }]}
                        label="Phone Number"
                        name="phone"
                    >
                        <Input
                            size="large"
                            placeholder="947xxxxxxxx"
                        />
                    </Form.Item>
                    <Form.Item
                        name={["user", "email"]}
                        rules={[{ required: true, message: 'Phone Number of Patient Is Required' }]}
                        label="Email"
                    >
                        <Input
                            size="large"
                            placeholder="user@example.com"
                        />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        rules={[{ required: true, message: 'Phone Number of Patient Is Required' }]}
                        label="Address"
                    >
                        <Input
                            size="large"
                            placeholder="No. 856, Princeton Road, Liberty City, Norway."
                        />
                    </Form.Item>
                    <Form.Item
                        name={["user", "password"]}
                        rules={[{ required: true, message: 'Phone Number of Patient Is Required' }]}
                        label="Password"
                    >
                        <Input
                            type="password"
                            size="large"
                            placeholder="Staff Password"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}