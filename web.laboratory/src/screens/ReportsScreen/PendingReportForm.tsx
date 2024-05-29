import React from "react";
import {Button, Col, Divider, Flex, Form, Input, InputNumber, Modal, Row, Select, SelectProps} from "antd";
import {Patient, PatientSearchResponse} from "../../types/patient";
import {ApiAddPatient, ApiGetPatientById, ApiSearchPatients} from "../../services/patient.ts";
import {Option, OptionProps} from "antd/es/mentions";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import useReportFormatStore from "../../stores/ReportTypeStore.ts";
import {ApiAddPendingReports} from "../../services/report.ts";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

type ReportFormat = {
    report_format: number;
    referred_by: string;
}

export type PendingReportFormProps = {
    patient: number;
    name: string;
    age: string;
    gender: string;
    reports: ReportFormat[];
}

export default function PendingReportForm(props:ModalFormProps) {
    const [patientData, setPatientData] = React.useState<PatientSearchResponse[]>([]);
    const [form] = Form.useForm<PendingReportFormProps>();
    
    const reports = useReportFormatStore(state => state.reports);

    const onFormSubmit = () => {
        form
            .validateFields()
            .then((values) => {
                ApiAddPendingReports(values)
                .then(response => {
                    console.log(response);
                })
                    .catch(error => {
                        console.log(error);
                    })
            })
    }
    
    const handlePatientSelect = (patientId: number) => {
        ApiGetPatientById(patientId)
            .then(response => {
                console.log(response.data);
                form.setFieldsValue({
                    name: `${response.data.title} ${response.data.first_name} ${response.data.last_name}`,
                    age: response.data.age,
                    gender: response.data.gender
                })
            })
    }

    const onCancel = () => {
        form.resetFields();
        props.setOpen(false);
    }

    const handleSearch = (value: string) => {
        // Only performing search after 3 characters entered.
        if (value.length > 2) {
            ApiSearchPatients(value)
                .then(result => {
                    console.log(result.data);
                    setPatientData(result.data)
                })
                .catch(error => {
                    console.log(error);
                })
        } else {
            setPatientData([]);
        }
    }

    return (
        <Modal
            title="Add Pending Reports"
            open={props.open}
            onOk={onFormSubmit}
            onCancel={onCancel}
        >
            <Form
                layout="vertical"
                form={form}
            >
                <Form.Item
                    name="patient"
                    label="Select Patient"
                >
                    <Select
                        showSearch
                        // value={value}
                        placeholder={"Search Patient"}
                        defaultActiveFirstOption={true}
                        // suffixIcon={null}
                        filterOption={false}
                        onSearch={handleSearch}
                        onSelect={handlePatientSelect}
                        // onChange={handleChange}
                        notFoundContent={null}
                    >
                        {patientData.map((d) => (
                            <Option key={d.value} value={d.value}>{d.text}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Divider>Or</Divider>
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'First Name of Patient Is Required' }]}
                    label="Patient Name"
                >
                    <Input placeholder="Mr. John Doe" />
                </Form.Item>
                <Row gutter={16}>
                    <Col xs={12}>
                    <Form.Item
                        name="gender"
                        rules={[{ required: true, message: 'Gender Of Patient Is Required' }]}
                        label="Gender"
                    >
                        <Select
                            placeholder="Gender of the Patient"
                        >
                            <Option value=""></Option>
                            <Option value="MALE">MALE</Option>
                            <Option value="FEMALE">FEMALE</Option>
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col xs={12}>
                    <Form.Item
                        name="age"
                        rules={[{ required: true, message: 'Age of Patient Is Required' }]}
                        label="Age"
                    >
                        <Input placeholder="Age" />
                    </Form.Item>
                    </Col>
                </Row>
                <Divider>Reports List</Divider>
                <Form.List
                    name="reports"
                >
                    {(fields, { add, remove }) => (
                        <>
                        {fields.map(({ key, name, ...restField }, i) => (
                        <Row gutter={16}>
                            <Col xs={11}>
                            <Form.Item
                                {...restField}
                                name={[name, 'report_format']}
                                rules={[{ required: true, message: 'Missing Report Format' }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Report Type"
                                    optionFilterProp="items"
                                    // onChange={(value) => onChangeMaterial(value, i)}
                                    // filterOption={(input, option) => {
                                    //     return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    // }}
                                >
                                    {reports.map((report, i) => (
                                        <Option key={i} value={report.id}>{report.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            </Col>
                            <Col xs={11}>
                                
                            <Form.Item
                                {...restField}
                                name={[name, 'referred_by']}
                                rules={[{ required: true, message: 'Missing Referred By' }]}

                            >
                                <Input min={1} placeholder="Referred By" />
                            </Form.Item>
                            </Col>
                            <Col xs={2}>
                            <Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} />
                            </Form.Item>
                            </Col>
                        </Row>
                            ))}
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                style={{width: '100%'}}
                                icon={<PlusOutlined />}
                            >
                                Add Report Type
                            </Button>
                        </>
                        )}

                            </Form.List>
                {/*<Form.Item*/}
                {/*    name="title"*/}
                {/*    rules={[{ required: true, message: 'Title of Patient Is Required' }]}*/}
                {/*    label="Title"*/}
                {/*>*/}
                {/*    <Select*/}
                {/*        size="large"*/}
                {/*        placeholder="Title of Patient"*/}
                {/*    >*/}
                {/*        {titles.map((item) => (<Option key={item} value={item}>{item}</Option>))}*/}
                {/*    </Select>*/}
                {/*</Form.Item>*/}
                {/*<Form.Item*/}
                {/*    name="phone"*/}
                {/*    rules={[{ required: true, message: 'Phone Number of Patient Is Required' }]}*/}
                {/*    label="Phone Number"*/}
                {/*>*/}
                {/*    <Input*/}
                {/*        size="large"*/}
                {/*        placeholder="947xxxxxxxx"*/}
                {/*    />*/}
                {/*</Form.Item>*/}
                {/*<Form.Item*/}
                {/*    name="nic"*/}
                {/*    label="NIC No."*/}
                {/*>*/}
                {/*    <Input size="large" />*/}
                {/*</Form.Item>*/}
                {/*<Form.Item*/}
                {/*    name="birth_date"*/}
                {/*    rules={[{ required: true, message: 'Birth Date of Patient Is Required' }]}*/}
                {/*    label="Birth Date"*/}
                {/*>*/}
                {/*    <Input*/}
                {/*        size="large"*/}
                {/*        placeholder="YYYY-MM-DD"*/}
                {/*    />*/}
                {/*</Form.Item>*/}
            </Form>
        </Modal>
    )
}