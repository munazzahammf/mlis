import {ReportQueue} from "../../types/report";
import React, {useEffect} from "react";
import {ApiGetReports} from "../../services/report.ts";
import PendingReportRequestsTable from "./PendingReportRequestsTable.tsx";
import TopRightButton from "../../components/TopRightButton.tsx";
import PendingReportForm from "./PendingReportForm.tsx";
import {Outlet} from "react-router-dom";
import {ClockCircleOutlined} from "@ant-design/icons";
import {Card, Col, Row, Statistic} from "antd";

export function Dashboard() {
    const [reportQueue, setReportQueue] = React.useState<ReportQueue[]>([])
    const [pendingReportFormOpen, setPendingReportFormOpen] = React.useState(false)

    const fetchReportQueue = () => {
        ApiGetReports()
            .then(response => {
                setReportQueue(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            })
    }

    const onPendingReportFormSubmit = () => {
        fetchReportQueue();
    }

    useEffect(() => {
        fetchReportQueue()
    }, [])

    return (
        <div>
            <Row>
                <Col xs={6}>
                    <Card bordered={false}>
                        <Statistic
                            title="Pending Reports"
                            value={reportQueue.filter((queue) => queue.status === "PENDING").length}
                            valueStyle={{ color: 'darkred' }}
                            prefix={<ClockCircleOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={6}>
                    <Card bordered={false}>
                        <Statistic
                            title="Pending Delivery"
                            value={reportQueue.filter((queue) => queue.status === "GENERATED").length}
                            valueStyle={{ color: 'green' }}
                            prefix={<ClockCircleOutlined />}
                        />
                    </Card>
                </Col>
            </Row>
            <TopRightButton
                size="large"
                type="primary"
                onClick={() => setPendingReportFormOpen(true)}
            >
                Add Pending
            </TopRightButton>
            <PendingReportForm
                open={pendingReportFormOpen}
                setOpen={setPendingReportFormOpen}
                onSubmit={onPendingReportFormSubmit}
            />
            <PendingReportRequestsTable
                data={reportQueue}
            />
            <Outlet />
        </div>
    )
}