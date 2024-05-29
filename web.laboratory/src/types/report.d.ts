export interface Report {
    id: number;
    report_format: string;
    values?: JSON;
    has_paid: boolean;
    status: string;
}

export interface ReportQueue {
    id: number;
    patient: string;
    reports: Report[];
}