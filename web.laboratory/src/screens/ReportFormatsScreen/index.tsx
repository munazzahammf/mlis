import {Button, Table, TableProps} from "antd";
import useReportFormatStore from "../../stores/ReportTypeStore.ts";
import {Link, Outlet, useParams} from "react-router-dom";
import {EditFilled} from "@ant-design/icons";
import ReportFormatEditForm from "./ReportFormatEditForm.tsx";

type ReportFormat = {
    id: number;
    name: string;
    specimen_type: string;
    price: string;
}

const columns: TableProps<ReportFormat>['columns'] = [
    {
        title: 'Report Type',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'GENERATION TIME',
        dataIndex: 'generation_time',
        key: 'generation_time',
        align: "center",
        render: text => {
            return text + ' mins'
        }
    },
    {
        title: 'SPECIMEN TYPE',
        dataIndex: 'specimen_type',
        key: 'specimen_type',
        align: "center"
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Actions',
        dataIndex: 'slug',
        key: 'slug',
        render: (_, record) => {
            return <Link to={`${record.id}`}><Button shape="circle" style={{background: 'orange'}} type={"primary"} icon={<EditFilled />} /></Link>
        }
    }
]
export default function ReportFormatsScreen() {
    
    const report_formats = useReportFormatStore(state => state.reports);
    const params = useParams();
    
    return (
        <div>
            <Table
                rowKey="id"
                columns={columns}
                dataSource={report_formats}
            />
            {params.reportId && <ReportFormatEditForm />}
        </div>
    )
}