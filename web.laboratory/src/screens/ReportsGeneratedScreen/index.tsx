import {useEffect, useState} from "react";
import {ApiGetReports} from "../../services/report.ts";
import {ReportQueue} from "../../types/report";
import {Button, Space, Table, TableProps} from "antd";
import {EyeFilled, PrinterOutlined} from "@ant-design/icons";
import {Link, Outlet} from "react-router-dom";

const columns: TableProps<ReportQueue>['columns'] = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Report',
        dataIndex: 'report_format',
        key: 'report_format',
        align: 'center'
    },
    {
        title: 'Payment Status',
        dataIndex: 'has_paid',
        key: 'has_paid',
        align: 'center',
        render: text => {
            console.log(text)
            return text ? "PAID": "DUE"
        }
    },
    {
        title: 'Payment Status',
        dataIndex: 'has_paid',
        key: 'has_paid',
        align: 'center',
        render: text => {
            console.log(text)
            return text ? "PAID": "DUE"
        }
    },
    {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render:((_, record) => (
            <Space direction="horizontal">
                <Link to={`${record.report_format}/${record.id}`}><Button type="primary" icon={<EyeFilled />} /></Link>
            </Space>
        ))
    }
]

export default function ReportsGeneratedScreen() {
    const [reportsGenerated, setReportsGenerated] = useState<ReportQueue[]>([]);
    
    const fetchGeneratedReports = () => {
        ApiGetReports('GENERATED')
            .then(res => {
                setReportsGenerated(res.data);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchGeneratedReports()
    }, [])

    return (
        <div>
            <Table
                columns={columns}
                dataSource={reportsGenerated}
            />
            <Outlet context={{fetchReportQueue: fetchGeneratedReports}} />
        </div>
    )
}