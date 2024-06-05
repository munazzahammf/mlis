import ReportItemCard from "../components/ReportItemCard.tsx";
import {useEffect, useState} from "react";
import {ApiGetReportsOfUser} from "../services/ReportService.ts";
import {Empty} from "antd";

export default function HomeScreen() {
    const [reports, setReports] = useState([])
    
    useEffect(() => {
        ApiGetReportsOfUser()
            .then(res => setReports(res.data))
            .catch(err => console.log(err))
    }, [])
    
    return (
        <div
            style={{
                backgroundColor: 'white',
                paddingTop: '2rem'
            }}
        >
            {reports.length === 0 ?
                <Empty
                    description={"No reports found."}
                />:
                reports.map((report) => (<ReportItemCard key={report.id} report={report} />))
            }
        </div>
    )
}