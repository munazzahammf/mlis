import {Table, TableProps} from "antd";
import {Patient} from "../../types/patient";


const columns: TableProps<Patient>['columns'] = [
    {
        title: 'Patient Name',
        dataIndex: 'name',
        key: 'name',
        render: (_, record) => {
            return `${record.title} ${record.first_name} ${record.last_name}`;
        }
    },
    {
        title: 'Contact No',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'NIC',
        dataIndex: 'nic',
        key: 'nic',
        render: (value) => {
            return value === null ? <i>Not Given</i>: value;
        }
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
    {
        title: 'Birth Date',
        dataIndex: 'birth_date',
        key: 'birth_date',
    }
]

type PatientTableProps = {
    patients: Patient[];
}

const PatientsTable = (props: PatientTableProps) => {
    return (
        <Table
            columns={columns}
            dataSource={props.patients}
            rowKey="id"
        />
    )
}

export default PatientsTable;