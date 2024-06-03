import PatientsTable from "./PatientsTable.tsx";
import {Button} from "antd";
import styled from "styled-components";
import PatientForm from "./PatientForm.tsx";
import {useEffect, useState} from "react";
import {Patient} from "../../types/patient";
import {ApiGetAllPatients} from "../../services/patient.ts";

const StyledButton = styled(Button)`
    float: right;
    margin: 1rem;
`

export default function PatientsScreen() {
    const [patients, setPatients] = useState<Patient[]>([])
    const [patientFormOpen, setPatientFormOpen] = useState(false);
    
    const fetchPatients = () => {
        ApiGetAllPatients()
            .then(response => {
                console.log(response.data)
                setPatients(response.data)
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    const handleFormSubmit = () => {
        fetchPatients();
        setPatientFormOpen(false);
    }
    
    useEffect(() => {
        fetchPatients();
    }, [])
    
    return (
        <div>
            <StyledButton
                size="large"
                type="primary"
                onClick={() => setPatientFormOpen(true)}
            >
                Add Patient
            </StyledButton>
            <PatientsTable
                patients={patients}
            />
            <PatientForm
                open={patientFormOpen}
                setOpen={setPatientFormOpen}
                onSubmit={handleFormSubmit}
            />
        </div>
    )
}