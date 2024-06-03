import {Divider, Form, Input, InputNumber} from "antd";
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
            props.form?.setFieldValue(['values', 'ldl-cholesterol'], (totalCholValue - hdlValue - (triglyceride / 5)).toFixed(0));
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
    
    const onTriglycerideChange = () => {
        handleLDLCholValue()
        handleVLDLCholValue()
    }
    
    const onTotalCholesterolChange = () => {
        handleLDLCholValue();
        handleCholHdlRatio();
    }
    
    const onHDLCholChange = () => {
        handleLDLCholValue();
        handleCholHdlRatio();
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
            <Form.Item
                label="LDL - CHOLESTEROL"
                rules={[{required: true, message: 'LDL - CHOLESTEROL Required!'}]}
                name={['values', 'ldl-cholesterol']}
            >
                <InputNumber
                    style={{width: "100%"}}
                    addonAfter="mg / dL"
                    readOnly
                />
            </Form.Item>
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
