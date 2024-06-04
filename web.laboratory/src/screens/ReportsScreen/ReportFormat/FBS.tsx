import {Col, Divider, Form, Input, InputNumber, Row, Select} from "antd";
import {ReportFormProps} from "./index.tsx";

export default function FBS(props: ReportFormProps) {
    const ranges = {
            'glucose-fasting': [70, 110]
        }
    
    const handleRange = (name: string, value: number | null) => {
        const constraint = ranges[name]

        const field = ['values', `${name}-remarks`]
        
        if (value === null)
            return

        if (value < constraint[0]) {
            props.form.setFieldValue(field, 'LOW')
        } else if (value > constraint[1]) {
            props.form.setFieldValue(field, 'HIGH')
        } else {
            props.form.setFieldValue(field, 'NORMAL')
        }
    }
    
    return (
        <>
            <Form.Item
                name="referred_by"
                label="Referred By"
                rules={[{ required: true, message: 'Referred By Required' }]}
            >
                <Input placeholder="Dr. Supun Gamlath" />
            </Form.Item>
            <Divider>FBS Values</Divider>
            <Row gutter={16}>
                <Col xs={16}>
                    <Form.Item
                        label="GLUCOSE-FASTING"
                        rules={[{ required: true, message: 'GLUCOSE FASTING Required' }]}
                        name={['values', 'glucose-fasting']}
                    >
                        <InputNumber
                            style={{width: "100%"}}
                            addonAfter="mg / dL"
                            min={15}
                            max={1000}
                            onChange={(value) => handleRange('glucose-fasting', value)}
                        />
                    </Form.Item>
                </Col>
                <Col xs={8}>
                    <Form.Item
                        label="REMARKS"
                        rules={[{ required: true, message: 'GLUCOSE FASTING Required' }]}
                        name={['values', 'glucose-fasting-remarks']}
                    >
                        <Input
                            readOnly
                        />
                    </Form.Item>
                </Col>
            </Row>
        </>
    )
}
