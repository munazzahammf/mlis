import {Col, Divider, Form, Input, InputNumber, Row} from "antd";
import {ReportFormProps} from "./index.tsx";

export default function LipidProf(props: ReportFormProps) {

    const handleCholHdlRatio = () => {
        const totalCholValue = props.form?.getFieldValue(['values', 'total-cholesterol'])
        const hdlValue = props.form?.getFieldValue(['values', 'hdl-cholesterol'])

        if (totalCholValue > 0 && hdlValue > 0) {
            props.form?.setFieldValue(['values', 'chol-hdl-ratio'], (totalCholValue / hdlValue).toFixed(1));
        }
    }

    const handleLDLCholValue = () => {
        const totalCholValue = props.form?.getFieldValue(['values', 'total-cholesterol'])
        const hdlValue = props.form?.getFieldValue(['values', 'hdl-cholesterol'])
        const triglyceride = props.form?.getFieldValue(['values', 'triglyceride'])

        if (totalCholValue > 0 && hdlValue > 0 && triglyceride > 0)  {
            const ldlCholValue = (totalCholValue - hdlValue - (triglyceride / 5)).toFixed(0)
            props.form?.setFieldValue(['values', 'ldl-cholesterol'], ldlCholValue);
            handleRange('ldl-cholesterol', ldlCholValue)
        }
    }

    const getFieldValue = (fieldName: string) => {
        return props.form?.getFieldValue(['values', fieldName])
    }

    const setFieldsValue = (fieldName: string, value: string | number) => {
        props.form?.setFieldValue(['values', fieldName], value)
    }

    const handleVLDLCholValue = () => {
        const triglyceride = getFieldValue('triglyceride')

        if (triglyceride > 0) {
            setFieldsValue('vldl-cholesterol', (triglyceride / 5).toFixed(0))
        }
    }

    const onTriglycerideChange = (value: number) => {
        handleRange('triglyceride', value)
        handleLDLCholValue()
        handleVLDLCholValue()
    }

    const onTotalCholesterolChange = (value: number) => {
        handleRange('total-cholesterol', value)
        handleLDLCholValue();
        handleCholHdlRatio();
    }

    const onHDLCholChange = (value: number) => {
        handleRange('hdl-cholesterol', value)
        handleLDLCholValue();
        handleCholHdlRatio();
    }

    const ranges = {
        'total-cholesterol': [0, 200],
        'triglyceride': [0, 150],
        'hdl-cholesterol': [40, Infinity],
        'ldl-cholesterol': [0, 129],
    }

    const handleRange = (name: string, value: number | null) => {
        const constraint = ranges[name]
        
        console.log(name)

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
            <Divider>LIPID PROF Values</Divider>
            <Row gutter={16}>
                <Col xs={16}>
                    <Form.Item
                        label="TOTAL CHOLESTEROL"
                        rules={[{required: true, message: 'TOTAL CHOLESTEROL Required!'}]}
                        name={['values', 'total-cholesterol']}
                    >
                        <InputNumber
                            onChange={onTotalCholesterolChange}
                            style={{width: "100%"}}
                            addonAfter="mg / dL"
                        />
                    </Form.Item>
                </Col>
                <Col xs={8}>
                    <Form.Item
                        label="REMARKS"
                        rules={[{ required: true, message: 'GLUCOSE FASTING Required' }]}
                        name={['values', 'total-cholesterol-remarks']}
                    >
                        <Input
                            readOnly
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={16}>
                    <Form.Item
                        label="TRIGLYCERIDE"
                        rules={[{required: true, message: 'TRIGLYCERIDE Required!'}]}
                        name={['values', 'triglyceride']}
                    >
                        <InputNumber
                            onChange={onTriglycerideChange}
                            style={{width: "100%"}}
                            addonAfter="mg / dL"
                        />
                    </Form.Item>
                </Col>
                <Col xs={8}>
                    <Form.Item
                        label="REMARKS"
                        rules={[{ required: true, message: 'GLUCOSE FASTING Required' }]}
                        name={['values', 'triglyceride-remarks']}
                    >
                        <Input
                            readOnly
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={16}>
                    <Form.Item
                        label="HDL - CHOLESTEROL"
                        rules={[{required: true, message: 'HDL - CHOLESTEROL Required!'}]}
                        name={['values', 'hdl-cholesterol']}
                    >
                        <InputNumber
                            onChange={onHDLCholChange}
                            style={{width: "100%"}}
                            addonAfter="mg / dL"
                        />
                    </Form.Item>
                </Col>
                <Col xs={8}>
                    <Form.Item
                        label="REMARKS"
                        rules={[{ required: true, message: 'GLUCOSE FASTING Required' }]}
                        name={['values', 'hdl-cholesterol-remarks']}
                    >
                        <Input
                            readOnly
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={16}>
                    <Form.Item
                        label="LDL - CHOLESTEROL"
                        rules={[{required: true, message: 'LDL - CHOLESTEROL Required!'}]}
                        name={['values', 'ldl-cholesterol']}
                    >
                        <InputNumber
                            onChange={(val) => handleRange('ldl-cholesterol', val)}
                            style={{width: "100%"}}
                            addonAfter="mg / dL"
                            readOnly
                        />
                    </Form.Item>
                </Col>
                <Col xs={8}>
                    <Form.Item
                        label="REMARKS"
                        rules={[{ required: true, message: 'GLUCOSE FASTING Required' }]}
                        name={['values', 'ldl-cholesterol-remarks']}
                    >
                        <Input
                            readOnly
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item
                label="VLDL - CHOLESTEROL"
                rules={[{required: true, message: 'VLDL - CHOLESTEROL Required!'}]}
                name={['values', 'vldl-cholesterol']}
            >
                <InputNumber
                    style={{width: "100%"}}
                    addonAfter="mg / dL"
                    readOnly
                />
            </Form.Item>
            <Form.Item
                label="CHOL / HDL RATIO"
                rules={[{required: true, message: 'CHOL / HDL RATIO Required!'}]}
                name={['values', 'chol-hdl-ratio']}
            >
                <InputNumber
                    style={{width: "100%"}}
                    readOnly
                />
            </Form.Item>
        </>
    )
}
