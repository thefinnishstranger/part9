import patients from '../../data/patients';
import { NewPatientEntry, NoSsnIncludedPatient, PatientEntry } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getPatients = (): PatientEntry[] => {
    return patients;
};

const getPatientsWithoutSsn = (): NoSsnIncludedPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
    const newPatientEntry = {
        id: uuidv4(),
        ...entry
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

const getPatientById = (id: string): PatientEntry | undefined => {
   return patients.find(p => p.id === id)
}

export default {
    getPatients,
    getPatientsWithoutSsn,
    addPatient,
    getPatientById
};
