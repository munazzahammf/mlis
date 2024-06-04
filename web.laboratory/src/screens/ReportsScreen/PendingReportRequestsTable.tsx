import {Button, Form, Modal, Space, Switch, Table, TableProps, Tag} from "antd";
import {Report, ReportQueue} from "../../types/report";
import {Link, useNavigate} from "react-router-dom";
import {CheckOutlined, EditFilled, ForwardOutlined} from "@ant-design/icons";
import {formatDistanceToNow} from "date-fns";
import {useState} from "react";
import {ApiUpdateReportStatus} from "../../services/report.ts";

interface PendingReportsTableProps {
    data: ReportQueue[];
}

const getColumns: TableProps<ReportQueue>['columns'] = (onStatusUpdateButtonClicked) => {

    return [
        {
            title: 'Patient',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => {
                if (!record.phone) {
                    return text;
                }
                return text + ' (' + record.phone + ')'
            }
        },
        {
            title: 'Report',
            dataIndex: 'report_format',
            key: 'report_format',
            align: 'center'
        },
        {
            title: 'SAMPLE ID',
            dataIndex: 'sample_id',
            key: 'sample_id',
            align: 'center'
        },
        {
            title: 'Payment Status',
            dataIndex: 'has_paid',
            key: 'has_paid',
            align: 'center',
            render: text => {
                console.log(text)
                return text ? "PAID" : "DUE"
            }
        },
        {
            title: 'Delivery Time',
            dataIndex: 'delivery_date',
            key: 'delivery_date',
            render: (text) => {
                if (text) {
                    {
                        const deliverDate = new Date(text);
                        const now = new Date();

                        let color = null;

                        if (deliverDate < now) {
                            color = 'red'
                        }
                        return <span
                            style={{color: color}}>{formatDistanceToNow(new Date(text), {addSuffix: true})}</span>
                    }
                }
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center'
        },
        {
            title: 'Initiated At',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (text) => {
                return new Date(text).toLocaleString()
            }
        },
        {
            title: 'Actions',
            render: (text, record) => {
                const isReportPending = record.status === 'PENDING'
                const isGenerated = record.status === 'GENERATED'

                const url = `${record.report_format}/${record.id}`
                return (
                    <Space>
                        {isReportPending &&
                            <Link to={url}><Button shape="circle" type={"primary"} icon={<ForwardOutlined/>}/></Link>}
                        {!isReportPending &&
                            <Link to={url}><Button shape="circle" style={!isReportPending ? {background: 'orange'} : {}}
                                                   disabled={isReportPending} type={"primary"}
                                                   icon={<EditFilled/>}/></Link>}
                        <Button shape="circle" disabled={isReportPending} onClick={() => onStatusUpdateButtonClicked(record)} type={"primary"} icon={<CheckOutlined />} />
                    </Space>
                )
            }
        }
    ]
}

const PendingReportRequestsTable = (props: PendingReportsTableProps) => {
    const [statusUpdateFormOpen, setStatusUpdateFormOpen] = useState(false);
    const [currentReportId, setCurrentReportId] = useState()
    const [form] = Form.useForm();
    
    const onReportStatusUpdate = (data) => {
        
        setCurrentReportId(data.id)
        
        form.setFieldsValue({
            has_paid: data.has_paid,
            delivered: false
        })
        setStatusUpdateFormOpen(true)
    }


    const columns = getColumns(onReportStatusUpdate)

    const updateReportStatus = () => {
        form
            .validateFields()
            .then(value => {
                ApiUpdateReportStatus(currentReportId, value)
                .then(() => {
                    setStatusUpdateFormOpen(false);
                    form.resetFields()
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    const onStatusFormClosed = () => {
        form.resetFields()
        setStatusUpdateFormOpen(false)
    }

    return (
        <>
            <Table
                columns={columns}
                dataSource={props.data}
                rowKey="id"
            />
            <Modal
                title="Update Report Status"
                open={statusUpdateFormOpen}
                onOk={updateReportStatus}
                onCancel={onStatusFormClosed}
            >
                <Form
                    layout="vertical"
                    form={form}
                >
                <Form.Item
                    name="delivered"
                    label="Delivered"
                    required={true}
                >
                    <Switch />
                </Form.Item>
                <Form.Item
                    name="has_paid"
                    label="Paid"
                    required={true}
                >
                    <Switch />
                </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default PendingReportRequestsTable;