import {useParams} from "react-router-dom";
import FBS from "./FBS.tsx";
import ReportFormatLayout from "../../../layouts/ReportFormatLayout.tsx";
import {Button, Col, Divider, Form, FormInstance, Input, Row, Select, Space} from "antd";
import React, {useEffect} from "react";
import {ApiGetReportRequestById} from "../../../services/report_request.ts";
import LipidProf from "./LipidProf.tsx";
import {ApiGenerateReport, ApiSaveReportData} from "../../../services/report_generate.ts";
import {PrinterFilled} from "@ant-design/icons";

type UrlParams = {
    reportId: string;
    reportFormat: string;
}

export type ReportFormProps = {
    form?: FormInstance<string>;
}

const ReportMapping:{ [key: string]: React.FC<ReportFormProps> } = {
    "FBS": FBS,
    "LIPID PROF": LipidProf
}

export default function ReportFormat() {
    const params = useParams<UrlParams>();
    const [form] = Form.useForm();

    const reportId = params.reportId as string;
    const reportFormat = params.reportFormat as string;

    const CurrentReport = ReportMapping[reportFormat];

    useEffect(() => {
        ApiGetReportRequestById(params.reportId as string)
            .then(res => {

                console.log(res.data)
                form.setFieldsValue(res.data)
            })
            .then(()=> {
            })
            .catch(err => {
                console.log(err)
            })

    }, [params.reportId])


    const onSubmit = async (values) => {
        try {
            await ApiSaveReportData(reportId, values)

            // when the pdf response comes open in the browser
            const response = await ApiGenerateReport(reportId, values)

            const pdfBlob = new Blob([response.data], {type: "application/pdf"})

            // Create a URL for the Blob
            const pdfUrl = URL.createObjectURL(pdfBlob);
            // Create a temporary link element
            const newWindow = window.open(pdfUrl)

            if (newWindow) {
                newWindow.addEventListener('load', () => {
                    newWindow.print();
                }, {once: true});
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <ReportFormatLayout title={"GENERATE REPORT"}>
            <Divider>Report Details</Divider>
            <Form
                form={form}
                layout="vertical"
                onFinish={onSubmit}
            >
                <Form.Item
                    label="Patient Name"
                    name="name"
                    rules={[{ required: true, message: 'Name Required' }]}
                >
                    <Input placeholder="Mr. John Doe" />
                </Form.Item>
                <Row gutter={16}>
                    <Col xs={12}>
                        <Form.Item
                            name="gender"
                            rules={[{ required: true, message: 'Gender Required' }]}
                            label="Gender"
                        >
                            <Select
                                placeholder="Gender"
                                options={[
                                    {label: "", value: ""},
                                    {label: "MALE", value: "MALE"},
                                    {label: "FEMALE", value: "FEMALE"},
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={12}>
                        <Form.Item
                            name="age"
                            rules={[{ required: true, message: 'Age Required' }]}
                            label="Age"
                        >
                            <Input placeholder="Age" />
                        </Form.Item>
                    </Col>
                </Row>
                {CurrentReport !== undefined ? <CurrentReport form={form} />: <></> }
                <Space direction="horizontal">
                    <Button type="default" htmlType="submit">DRAFT</Button>
                    <Button type="primary" htmlType="submit">SAVE</Button>
                    <Button type="primary" htmlType="submit" icon={<PrinterFilled />}>SAVE & PRINT</Button>
                </Space>
            </Form>
        </ReportFormatLayout>
    )
}