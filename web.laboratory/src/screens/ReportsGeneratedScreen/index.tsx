import {useEffect, useState} from "react";
import {ApiGetReports} from "../../services/report.ts";
import {ReportQueue} from "../../types/report";
import {Table, TableProps} from "antd";

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
]

export default function ReportsGeneratedScreen() {
    const [reportsGenerated, setReportsGenerated] = useState<ReportQueue[]>([]);
    
    useEffect(() => {
        ApiGetReports('GENERATED')
            .then(res => {
                setReportsGenerated(res.data);
            })
            .catch(err => console.log(err))
    }, [])
    
    return (
        <div>
            <Table
                columns={columns}
                dataSource={reportsGenerated}
            />
        </div>
    )
}