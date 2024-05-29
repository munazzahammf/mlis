import {Table, TableProps} from "antd";
import {Report, ReportQueue} from "../../types/report";

interface PendingReportsTableProps {
    data: ReportQueue[];
}

const columns: TableProps<ReportQueue>['columns'] = [
    {
        title: 'Patient Name',
        dataIndex: 'patient',
        key: 'patient',
    },
    {
        title: 'Reports',
        dataIndex: 'reports',
        key: 'reports',
        render: (value: Report[]) => {
            return (
                <div>
                    {value.map((val) => <div>{val.report_format}</div>)}
                </div>
            )
        }
    }
]

const PendingReportsTable = (props: PendingReportsTableProps) => {
    return (
        <Table
            columns={columns}
            dataSource={props.data}
        />
    )
}

export default PendingReportsTable;