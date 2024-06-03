import { Divider, Form, Input, InputNumber } from "antd";

export default function FBS() {

    // useEffect(() => {
    // })

    // const onSubmit = (values) => {
    //     console.log(values);
    //     // when the pdf response comes open in the browser
    //     ApiGenerateReport(values)
    //         .then(response => {
    //             const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
    //
    //             // Create a URL for the Blob
    //             const pdfUrl = URL.createObjectURL(pdfBlob);
    //
    //             // Open the URL in a new window
    //             window.open(pdfUrl);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }

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
                />
            </Form.Item>
        </>
    )
}
