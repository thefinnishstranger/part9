import { useEffect, useState } from 'react';
import patientService from '../../services/patients';
import { useParams } from 'react-router-dom';
import { Diagnosis, Patient } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import axios from 'axios';


const SinglePatient = () => {
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const fetchedPatient = await patientService.getPatient(id);
                setPatient(fetchedPatient);
            } catch (error) {
                console.error('Error fetching patient', error);
                setPatient(null);
            }
        };

        const fetchDiagnoses = async () => {
            try {
                const { data: diagnosesData } = await axios.get<Diagnosis[]>('http://localhost:3000/api/diagnoses')
                setDiagnoses(diagnosesData)
            } catch (error) {
                console.error(error);
                
            }
        }
        void fetchDiagnoses();
        void fetchPatient();
    }, [id]);

    const getDiagnosisName = (code: string): string => {
        const diagnosis = diagnoses.find(d => d.code === code)
        return diagnosis ? diagnosis.name : code
    }

    if (!patient) {
        return (
            <div>
                Patient not found
            </div>
        );
    }

    return (
        <div>
            <h2>
                {patient.name} {patient.gender === 'male' && <MaleIcon />}
                {patient.gender === 'female' && <FemaleIcon />}
            </h2>
            <div>
                <p>ssh: {patient.ssn}</p>
                <p>occupation: {patient.occupation}</p>
            </div>
            <div>
                <h3>entries</h3>
                {patient.entries.map(entry => (
                    <div key={entry.id} style={{ border: '1px solid black', marginBottom: '10px', padding: '10px', borderRadius: '10px' }}>
                        <p>{entry.date}</p>
                        <p>{entry.description}</p>
                        {entry.diagnosisCodes && (
                            <div>
                                <p>Diagnosis codes:</p>
                                <ul>
                                    {entry.diagnosisCodes.map(code => (
                                        <li key={code}>
                                            {code} - {getDiagnosisName(code)}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        )}
                        <p>diagnose by {entry.specialist}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SinglePatient;
