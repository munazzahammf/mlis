import {Avatar, Card} from "antd";
import Meta from "antd/es/card/Meta";
import {DownloadOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {formatDistanceToNow} from "date-fns";
import {ApiGenerateReport} from "../services/ReportService.ts";

export default function ReportItemCard(props) {

    const onPrint = () => {
        ApiGenerateReport(props.report.id)
        .then((response) => {
            const pdfBlob = new Blob([response.data], {type: "application/pdf"})

            // Create a URL for the Blob
            const pdfUrl = URL.createObjectURL(pdfBlob);
            // Create a temporary link element
            window.open(pdfUrl)
        })
            .catch (err => 
            console.log(err))
        }
    
    return (
        <Card
            actions={[
                <DownloadOutlined key="setting" onClick={onPrint} />,
            ]}
        >
            <Meta
                avatar={<Avatar>{props.report.report_format}</Avatar>}
                title={props.report.report_format}
                description={`Generated ${formatDistanceToNow(props.report.updated_at)}`}
            />
        </Card>
    )
}