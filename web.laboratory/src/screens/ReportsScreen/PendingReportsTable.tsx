import {Table, TableProps} from "antd";

interface DataType {
    patientName: string;
    patientId: string;
    reports: string[];
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Patient Name',
        dataIndex: 'patientName',
        key: 'patientName',
    },
    {
        title: 'Contact No',
        dataIndex: 'contactNo',
        key: 'contactNo',
    },
    {
        title: 'Reports',
        dataIndex: 'reports',
        key: 'reports'
    }
]

const PendingReportsTable = () => {
    return (
        <Table
            columns={columns}
        />
    )
}

export default PendingReportsTable;