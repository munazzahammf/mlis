export interface Patient {
    id?: number;
    first_name: string;
    last_name: string;
    title: string;
    phone: string;
    nic: string;
    gender: "MALE" | "FEMALE";
    birthdate: string;
}