export interface Report {
    id: number;
    report_format: string;
    values?: JSON;
    report_slug: string;
    has_paid: boolean;
    status: string;
}

export interface ReportQueue {
    id: number;
    patient: string;
    phone: string;
    has_paid: boolean;
    report_slug: string;
    created_at: string;
}