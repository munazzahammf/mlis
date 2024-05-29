import {ReportQueue} from "../../types/report";
import React, {useEffect} from "react";
import {ApiGetPendingReports} from "../../services/report.ts";
import PendingReportsTable from "./PendingReportsTable.tsx";
import TopRightButton from "../../components/TopRightButton.tsx";
import PendingReportForm from "./PendingReportForm.tsx";

export function Index() {
    const [reportQueue, setReportQueue] = React.useState<ReportQueue[]>([])
    const [pendingReportFormOpen, setPendingReportFormOpen] = React.useState(false)
    
    const fetchReportQueue = () => {
        ApiGetPendingReports()
            .then(response => {
                setReportQueue(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    useEffect(() => {
        fetchReportQueue()
    }, [])
    
    return (
        <div>
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
            />
            <PendingReportsTable
                data={reportQueue}
            />
        </div>
    )
}