import {Form, Input, InputNumber, Modal} from "antd";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import useReportFormatStore from "../../stores/ReportTypeStore.ts";
import {useForm} from "antd/es/form/Form";
import {ApiUpdateReportFormatValuesById} from "../../services/report_format.ts";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

type ReportFormatEditFormParams = {
    reportId: string;
}
export default function ReportFormatEditForm() {
    const [formOpen, setFormOpen] = useState(true);
    const [form] = useForm();
    const params = useParams<ReportFormatEditFormParams>();
    const navigate = useNavigate();

    const currentReport = useReportFormatStore(state => state.reports).find(report => report.id === Number(params.reportId));

    const onFormSubmit = () => {
        form.validateFields()
            .then((values) => {
                ApiUpdateReportFormatValuesById(params.reportId, values)
                    .then(() => {
                        
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
        
        navigate(-1)
    }
    
    const onClose = () => {
        form.resetFields()
        setFormOpen(false);
        
        setTimeout(() => navigate(-1), 250);
    }

    return (
        <Modal
            title="Edit Report"
            open={formOpen}
            onOk={onFormSubmit}
            onCancel={onClose}
        >
            <Form
                form={form}
                initialValues={currentReport}
                layout={"vertical"}
            >
                <Form.Item
                    name="name"
                    label="Report Type"
                    rules={[{ required: true, message: 'Name Required' }]}
                >
                    <Input
                        readOnly
                    />
                </Form.Item>
                <Form.Item
                    name="specimen_type"
                    label="Specimen"
                    rules={[{ required: true, message: 'Specimen Type Required' }]}
                >
                    <Input
                        readOnly
                    />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Price"
                    rules={[{ required: true, message: 'Price Required' }]}
                >
                    <InputNumber
                        addonBefore="LKR"
                        precision={2}
                        style={{width: '100%'}}
                    />
                </Form.Item>
                <Form.Item
                    name="generation_time"
                    label="Generate Time"
                    rules={[{ required: true, message: 'Generate Time Required' }]}
                >
                    <InputNumber
                        style={{width: '100%'}}
                        addonAfter="mins"
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}